import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
// Load .env file
dotenv.config();

// Define Scene item structure
export interface SceneItem {
  id: string;
  text: string;
  voice?: string;
  rate?: string;
  pitch?: string;
  volume?: string;
}

export interface GeneratedAudioResult {
  id: string;
  text: string;
  audioPath: string; // relative to public/
  filePath: string;  // absolute disk path
  sizeBytes: number;
  estimatedDurationSec: number;
  durationInFrames: number; // calculated at 30 fps
}

/**
 * Calculates estimated MP3 duration based on MPEG audio frame headers or file size
 */
export function estimateMp3Duration(buffer: Buffer, defaultBitrateKbps = 48): number {
  if (!buffer || buffer.length === 0) return 0;

  let totalDuration = 0;
  let offset = 0;

  // Skip ID3v2 tag if present
  if (buffer.length > 10 && buffer.toString("utf8", 0, 3) === "ID3") {
    const id3Size =
      ((buffer[6] & 0x7f) << 21) |
      ((buffer[7] & 0x7f) << 14) |
      ((buffer[8] & 0x7f) << 7) |
      (buffer[9] & 0x7f);
    offset = 10 + id3Size;
  }

  // Bitrate map for MPEG 2 / 2.5 Layer III (standard for Edge TTS 24kHz audio)
  const bitratesV2L3 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0];
  const sampleRatesV2 = [22050, 24000, 16000];

  let frameCount = 0;
  let parsedBytes = 0;

  while (offset < buffer.length - 4) {
    if (buffer[offset] === 0xff && (buffer[offset + 1] & 0xe0) === 0xe0) {
      const header = buffer.readUInt32BE(offset);
      const version = (header >> 19) & 3; // 0=2.5, 2=2, 3=1
      const bitrateIdx = (header >> 12) & 15;
      const sampleRateIdx = (header >> 10) & 3;
      const padding = (header >> 9) & 1;

      let bitrate = 48;
      if (version === 3) {
        // MPEG 1 Layer 3
        const bitratesV1L3 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
        bitrate = bitratesV1L3[bitrateIdx] || defaultBitrateKbps;
      } else {
        bitrate = bitratesV2L3[bitrateIdx] || defaultBitrateKbps;
      }

      let sampleRate = 24000;
      if (sampleRateIdx < sampleRatesV2.length) {
        sampleRate = sampleRatesV2[sampleRateIdx];
      }

      const samplesPerFrame = version === 3 ? 1152 : 576;
      const frameLength = Math.floor((samplesPerFrame * (bitrate * 1000) / 8) / sampleRate) + padding;

      if (frameLength > 0 && offset + frameLength <= buffer.length) {
        totalDuration += samplesPerFrame / sampleRate;
        frameCount++;
        parsedBytes += frameLength;
        offset += frameLength;
        continue;
      }
    }
    offset++;
  }

  if (totalDuration > 0) {
    return totalDuration;
  }

  // Fallback: estimate from total audio bytes using default bitrate (48kbps)
  const audioBytes = Math.max(0, buffer.length - offset);
  return (audioBytes * 8) / (defaultBitrateKbps * 1000);
}

/**
 * Generate speech file for a single text using edge-tts-universal
 */
export async function generateSpeechToFile(
  text: string,
  outputPath: string,
  options?: {
    voice?: string;
    rate?: string;
    pitch?: string;
    volume?: string;
  }
): Promise<{ sizeBytes: number; durationSec: number; durationInFrames: number }> {
  // Dynamically import edge-tts-universal
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const edgeTtsModule: any = await import("edge-tts-universal");
  const IsomorphicCommunicate =
    edgeTtsModule.IsomorphicCommunicate ||
    edgeTtsModule.Communicate ||
    edgeTtsModule.default?.IsomorphicCommunicate ||
    edgeTtsModule.default;

  const voice = options?.voice || process.env.EDGE_TTS_VOICE || "vi-VN-HoaiMyNeural";
  const rate = options?.rate || process.env.EDGE_TTS_RATE || "+10%";
  const pitch = options?.pitch || process.env.EDGE_TTS_PITCH || "+0Hz";
  const volume = options?.volume || process.env.EDGE_TTS_VOLUME || "+0%";

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const chunks: Buffer[] = [];
      const communicate = new IsomorphicCommunicate(text, {
        voice,
        rate,
        pitch,
        volume,
      });

      for await (const chunk of communicate.stream()) {
        if (chunk.type === "audio" && chunk.data) {
          if (Buffer.isBuffer(chunk.data)) {
            chunks.push(chunk.data);
          } else if (chunk.data instanceof Uint8Array || chunk.data instanceof ArrayBuffer) {
            chunks.push(Buffer.from(chunk.data));
          }
        }
      }

      const audioBuffer = Buffer.concat(chunks);
      if (audioBuffer.length === 0) {
        throw new Error("No audio bytes received");
      }

      fs.writeFileSync(outputPath, audioBuffer);

      const durationSec = estimateMp3Duration(audioBuffer);
      // Remotion uses 30 FPS by default, add 10 frames (~0.33s) safety padding for natural scene transition
      const durationInFrames = Math.ceil(durationSec * 30) + 10;

      return {
        sizeBytes: audioBuffer.length,
        durationSec: Math.round(durationSec * 100) / 100,
        durationInFrames,
      };
    } catch (err) {
      lastError = err;
      console.warn(`      ⚠️ Attempt ${attempt} failed, retrying in 1.5s...`, (err as Error)?.message || err);
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

  throw lastError;
}

/**
 * Batch generate voiceover for a topic script and write manifest
 */
export async function generateTopicVoices(
  topicKey: string,
  scenes: SceneItem[],
  customOutputDir?: string
): Promise<{ manifestPath: string; results: GeneratedAudioResult[]; totalDurationFrames: number }> {
  const outputBase = customOutputDir || process.env.EDGE_TTS_OUTPUT_DIR || "public/audio";
  const topicDir = path.resolve(process.cwd(), outputBase, topicKey);

  console.log(`\n🎙️ Generating voiceover for topic: "${topicKey}" (${scenes.length} scenes)...`);
  console.log(`📁 Target directory: ${topicDir}`);

  const results: GeneratedAudioResult[] = [];
  let totalDurationFrames = 0;

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const fileName = `${scene.id}.mp3`;
    const targetFile = path.join(topicDir, fileName);

    let sizeBytes = 0;
    let durationSec = 0;
    let durationInFrames = 0;

    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 1000) {
      const existingBuffer = fs.readFileSync(targetFile);
      sizeBytes = existingBuffer.length;
      durationSec = Math.round(estimateMp3Duration(existingBuffer) * 100) / 100;
      durationInFrames = Math.ceil(durationSec * 30) + 10;
      console.log(`      ✓ Using cached: ${durationSec}s (~${durationInFrames} frames)`);
    } else {
      const res = await generateSpeechToFile(
        scene.text,
        targetFile,
        {
          voice: scene.voice,
          rate: scene.rate,
          pitch: scene.pitch,
          volume: scene.volume,
        }
      );
      sizeBytes = res.sizeBytes;
      durationSec = res.durationSec;
      durationInFrames = res.durationInFrames;
      console.log(`      ✓ Done: ${durationSec}s (~${durationInFrames} frames)`);

      // Short pause between network requests to avoid rate limiting
      if (i < scenes.length - 1) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    const relativePublicPath = `audio/${topicKey}/${fileName}`;
    results.push({
      id: scene.id,
      text: scene.text,
      audioPath: relativePublicPath,
      filePath: targetFile,
      sizeBytes,
      estimatedDurationSec: durationSec,
      durationInFrames,
    });

    totalDurationFrames += durationInFrames;
  }

  // Save manifest metadata
  const manifestData = {
    topic: topicKey,
    voice: process.env.EDGE_TTS_VOICE || "vi-VN-HoaiMyNeural",
    rate: process.env.EDGE_TTS_RATE || "+10%",
    totalScenes: scenes.length,
    totalDurationFrames,
    totalDurationSec: Math.round((totalDurationFrames / 30) * 10) / 10,
    scenes: results,
    generatedAt: new Date().toISOString(),
  };

  const manifestPath = path.join(topicDir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), "utf-8");

  // Also write a TypeScript helper file in src/<TopicKey>/audioData.ts if directory exists
  const srcTopicDir = path.resolve(process.cwd(), "src", topicKey);
  if (fs.existsSync(srcTopicDir)) {
    const tsCode = `// Auto-generated by generate-tts script
export const audioManifest = ${JSON.stringify(manifestData, null, 2)} as const;
`;
    fs.writeFileSync(path.join(srcTopicDir, "audioData.ts"), tsCode, "utf-8");
  }

  console.log(`\n🎉 All voice files generated successfully!`);
  console.log(`📊 Total duration: ${manifestData.totalDurationSec}s (${totalDurationFrames} frames @ 30fps)`);
  console.log(`📄 Manifest saved at: ${manifestPath}\n`);

  return {
    manifestPath,
    results,
    totalDurationFrames,
  };
}

// CLI runner
if (require.main === module || (process.argv[1] && process.argv[1].endsWith("generate-tts.ts"))) {
  const args = process.argv.slice(2);
  const topicArg = args[0] || "DemoTopic";
  const sampleText = args[1] || "Xin chào, đây là video giải thích ngắn về chủ đề công nghệ được tạo bởi Remotion và Edge TTS.";

  (async () => {
    try {
      if (args[0] === "--text") {
        // Direct single text generation
        const text = args[1] || "Xin chào các bạn!";
        const out = args[2] || "public/audio/output.mp3";
        console.log(`Generating TTS to ${out}...`);
        const res = await generateSpeechToFile(text, path.resolve(process.cwd(), out));
        console.log(`Done! Duration: ${res.durationSec}s (${res.durationInFrames} frames)`);
      } else {
        // Demo topic batch generation
        await generateTopicVoices(topicArg, [
          {
            id: "scene1_hook",
            text: sampleText,
          },
        ]);
      }
    } catch (e) {
      console.error("Error running TTS generation:", e);
      process.exit(1);
    }
  })();
}
