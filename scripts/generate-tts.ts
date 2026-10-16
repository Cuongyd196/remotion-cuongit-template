import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
// Load .env file
dotenv.config();

// Define Scene item structure
export interface SceneItem {
  id: string;
  text: string;
  /** Voice of the active provider (Edge: "vi-VN-HoaiMyNeural", CIT: "Hải Đăng") */
  voice?: string;
  /** Edge TTS only */
  rate?: string;
  /** Edge TTS only */
  pitch?: string;
  /** Edge TTS only */
  volume?: string;
  /** CIT Voice Studio only: speech speed 0.5 - 2.0 (overrides CIT_TTS_SPEED) */
  speed?: number;
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

export interface SpeechOptions {
  voice?: string;
  rate?: string;
  pitch?: string;
  volume?: string;
  speed?: number;
}

export interface SpeechResult {
  sizeBytes: number;
  durationSec: number;
  durationInFrames: number;
}

export type TtsProvider = "edge" | "cit";

/**
 * Reads TTS_PROVIDER from .env: "edge" (default, edge-tts-universal) or "cit" (CIT Voice Studio)
 */
export function getTtsProvider(): TtsProvider {
  const provider = (process.env.TTS_PROVIDER || "edge").trim().toLowerCase();
  if (provider === "cit" || provider === "cit-voice-studio") return "cit";
  if (provider !== "edge") {
    console.warn(`⚠️ Unknown TTS_PROVIDER "${provider}", falling back to "edge"`);
  }
  return "edge";
}

/**
 * Output file extension for the given provider
 */
export function getAudioExtension(provider: TtsProvider = getTtsProvider()): "mp3" | "wav" {
  if (provider === "cit") {
    return (process.env.CIT_TTS_FORMAT || "wav").trim().toLowerCase() === "mp3" ? "mp3" : "wav";
  }
  return "mp3";
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
  const sampleRatesV1 = [44100, 48000, 32000];

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

      // MPEG 1 (e.g. CIT Voice Studio 44.1/48 kHz mp3) uses different sample rate table
      const sampleRates = version === 3 ? sampleRatesV1 : sampleRatesV2;
      let sampleRate = 24000;
      if (sampleRateIdx < sampleRates.length) {
        sampleRate = sampleRates[sampleRateIdx];
      }

      const samplesPerFrame = version === 3 ? 1152 : 576;
      const frameLength = Math.floor((samplesPerFrame * (bitrate * 1000) / 8) / sampleRate) + padding;

      if (frameLength > 0 && offset + frameLength <= buffer.length) {
        totalDuration += samplesPerFrame / sampleRate;
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
 * Reads exact WAV duration from RIFF header ("fmt " + "data" chunks)
 */
export function getWavDuration(buffer: Buffer): number {
  if (buffer.length < 44 || buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WAVE") {
    return 0;
  }

  let byteRate = 0;
  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunkId = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    if (chunkId === "fmt ") {
      byteRate = buffer.readUInt32LE(offset + 16);
    } else if (chunkId === "data") {
      // Streamed WAVs may carry a placeholder size, so clamp to the bytes actually present
      const dataSize = Math.min(chunkSize, buffer.length - offset - 8);
      return byteRate > 0 ? dataSize / byteRate : 0;
    }
    offset += 8 + chunkSize + (chunkSize % 2);
  }
  return 0;
}

/**
 * Duration of an MP3 or WAV buffer in seconds
 */
export function getAudioDuration(buffer: Buffer): number {
  if (buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF") {
    return getWavDuration(buffer);
  }
  return estimateMp3Duration(buffer);
}

function toFrames(durationSec: number): number {
  // Remotion uses 30 FPS by default, add 10 frames (~0.33s) safety padding for natural scene transition
  return Math.ceil(durationSec * 30) + 10;
}

function parseOptionalNumber(value: string | null | undefined): number | undefined {
  if (value === undefined || value === null || value.trim() === "") return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}

/**
 * Generate speech file for a single text using the provider set in TTS_PROVIDER
 */
export async function generateSpeechToFile(
  text: string,
  outputPath: string,
  options?: SpeechOptions
): Promise<SpeechResult> {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return getTtsProvider() === "cit"
    ? generateCitSpeechToFile(text, outputPath, options)
    : generateEdgeSpeechToFile(text, outputPath, options);
}

/**
 * Generate speech file for a single text using edge-tts-universal
 */
export async function generateEdgeSpeechToFile(
  text: string,
  outputPath: string,
  options?: SpeechOptions
): Promise<SpeechResult> {
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

      return {
        sizeBytes: audioBuffer.length,
        durationSec: Math.round(durationSec * 100) / 100,
        durationInFrames: toFrames(durationSec),
      };
    } catch (err) {
      lastError = err;
      console.warn(`      ⚠️ Attempt ${attempt} failed, retrying in 1.5s...`, (err as Error)?.message || err);
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

  throw lastError;
}

// ==============================================================================
// CIT Voice Studio (local API, see docs/cit-voice-studio.md)
// ==============================================================================

function getCitBaseUrl(): string {
  return (process.env.CIT_TTS_BASE_URL || "http://127.0.0.1:8001").trim().replace(/\/+$/, "");
}

function getCitHeaders(extra: Record<string, string> = {}): Record<string, string> {
  // API key is only required when calling from another machine (LAN / tunnel)
  const apiKey = process.env.CIT_TTS_API_KEY?.trim();
  return apiKey ? { ...extra, "X-API-Key": apiKey } : extra;
}

/**
 * GET /health - throws a readable error when CIT Voice Studio is not reachable or not ready
 */
export async function checkCitHealth(): Promise<{ status?: string; engine?: string; sample_rate?: number }> {
  const url = `${getCitBaseUrl()}/health`;
  let res: Response;
  try {
    res = await fetch(url, { headers: getCitHeaders(), signal: AbortSignal.timeout(5000) });
  } catch (err) {
    throw new Error(
      `Cannot connect to CIT Voice Studio at ${url}. Make sure the app is running (${(err as Error)?.message || err})`
    );
  }
  if (!res.ok) {
    throw new Error(`CIT Voice Studio /health returned HTTP ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

/**
 * Generate speech file for a single text using CIT Voice Studio POST /api/tts/generate
 */
export async function generateCitSpeechToFile(
  text: string,
  outputPath: string,
  options?: SpeechOptions
): Promise<SpeechResult> {
  const voiceId = options?.voice || process.env.CIT_TTS_VOICE?.trim() || undefined;
  const speed = options?.speed ?? parseOptionalNumber(process.env.CIT_TTS_SPEED) ?? 1.0;
  const temperature = parseOptionalNumber(process.env.CIT_TTS_TEMPERATURE) ?? 0.7;
  const seed = parseOptionalNumber(process.env.CIT_TTS_SEED);
  const language = process.env.CIT_TTS_LANGUAGE?.trim() || undefined;
  const usePronunciationDict = (process.env.CIT_TTS_USE_PRONUNCIATION_DICT || "true").trim().toLowerCase() !== "false";
  const timeoutMs = (parseOptionalNumber(process.env.CIT_TTS_TIMEOUT_SEC) ?? 120) * 1000;

  const body: Record<string, unknown> = {
    text,
    speed,
    temperature,
    format: getAudioExtension("cit"),
    use_pronunciation_dict: usePronunciationDict,
  };
  // Empty voice_id = default voice of the running model
  if (voiceId) body.voice_id = voiceId;
  if (language) body.language = language;
  if (seed !== undefined) body.seed = Math.trunc(seed);

  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    let fatal = false;
    try {
      const res = await fetch(`${getCitBaseUrl()}/api/tts/generate`, {
        method: "POST",
        headers: getCitHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(timeoutMs),
      });

      if (!res.ok) {
        // 4xx (unknown voice, bad API key, invalid language...) won't fix itself on retry; 503 = model still loading
        fatal = res.status >= 400 && res.status < 500;
        throw new Error(`CIT Voice Studio HTTP ${res.status}: ${await res.text()}`);
      }

      const audioBuffer = Buffer.from(await res.arrayBuffer());
      if (audioBuffer.length === 0) {
        throw new Error("No audio bytes received");
      }

      fs.writeFileSync(outputPath, audioBuffer);

      const durationSec =
        parseOptionalNumber(res.headers.get("X-Duration-Seconds")) ?? getAudioDuration(audioBuffer);

      return {
        sizeBytes: audioBuffer.length,
        durationSec: Math.round(durationSec * 100) / 100,
        durationInFrames: toFrames(durationSec),
      };
    } catch (err) {
      if (fatal) throw err;
      lastError = err;
      console.warn(`      ⚠️ Attempt ${attempt} failed, retrying in 3s...`, (err as Error)?.message || err);
      await new Promise((r) => setTimeout(r, 3000));
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
  const provider = getTtsProvider();
  const extension = getAudioExtension(provider);
  const outputBase =
    customOutputDir || process.env.TTS_OUTPUT_DIR || process.env.EDGE_TTS_OUTPUT_DIR || "public/audio";
  const topicDir = path.resolve(process.cwd(), outputBase, topicKey);

  console.log(`\n🎙️ Generating voiceover for topic: "${topicKey}" (${scenes.length} scenes) via "${provider}"...`);
  console.log(`📁 Target directory: ${topicDir}`);

  if (provider === "cit") {
    const health = await checkCitHealth();
    console.log(`🔌 CIT Voice Studio: ${health.engine || "unknown engine"} @ ${health.sample_rate || "?"} Hz`);
  }

  const results: GeneratedAudioResult[] = [];
  let totalDurationFrames = 0;

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const fileName = `${scene.id}.${extension}`;
    const targetFile = path.join(topicDir, fileName);

    let sizeBytes = 0;
    let durationSec = 0;
    let durationInFrames = 0;

    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 1000) {
      const existingBuffer = fs.readFileSync(targetFile);
      sizeBytes = existingBuffer.length;
      durationSec = Math.round(getAudioDuration(existingBuffer) * 100) / 100;
      durationInFrames = toFrames(durationSec);
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
          speed: scene.speed,
        }
      );
      sizeBytes = res.sizeBytes;
      durationSec = res.durationSec;
      durationInFrames = res.durationInFrames;
      console.log(`      ✓ Done: ${durationSec}s (~${durationInFrames} frames)`);

      // Short pause between network requests to avoid rate limiting (CIT runs locally, no need)
      if (provider === "edge" && i < scenes.length - 1) {
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
    provider,
    ...(provider === "cit"
      ? {
          voice: process.env.CIT_TTS_VOICE || "(model default)",
          speed: parseOptionalNumber(process.env.CIT_TTS_SPEED) ?? 1.0,
        }
      : {
          voice: process.env.EDGE_TTS_VOICE || "vi-VN-HoaiMyNeural",
          rate: process.env.EDGE_TTS_RATE || "+10%",
        }),
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
  const sampleText = args[1] || "Xin chào, đây là video giải thích ngắn về chủ đề công nghệ được tạo bởi Remotion.";

  (async () => {
    try {
      if (args[0] === "--text") {
        // Direct single text generation
        const text = args[1] || "Xin chào các bạn!";
        const out = args[2] || `public/audio/output.${getAudioExtension()}`;
        console.log(`Generating TTS (${getTtsProvider()}) to ${out}...`);
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
