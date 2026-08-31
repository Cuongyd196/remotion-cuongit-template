import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleBoxProps {
  text: string;
  durationInFrames: number;
  highlightKeyword?: string;
  className?: string;
}

/**
 * Splits text into readable chunks of roughly 5-7 words each.
 */
function chunkText(text: string, wordsPerChunk = 6): string[] {
  const words = text.trim().split(/\s+/);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += wordsPerChunk) {
    chunks.push(words.slice(i, i + wordsPerChunk).join(" "));
  }

  return chunks.length > 0 ? chunks : [text];
}

export const SubtitleBox: React.FC<SubtitleBoxProps> = ({
  text,
  durationInFrames,
  highlightKeyword,
  className = "mt-64",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chunks = chunkText(text, 6);
  const totalChunks = chunks.length;
  const framesPerChunk = durationInFrames / totalChunks;

  // Determine current active chunk index
  const currentChunkIndex = Math.min(
    Math.floor(frame / framesPerChunk),
    totalChunks - 1
  );

  const activeChunkText = chunks[currentChunkIndex] || "";
  const chunkStartFrame = currentChunkIndex * framesPerChunk;
  const chunkRelativeFrame = frame - chunkStartFrame;

  // Spring pop-in for each chunk change
  const scale = spring({
    frame: chunkRelativeFrame,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.6 },
  });

  const opacity = interpolate(
    chunkRelativeFrame,
    [0, 4],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const words = activeChunkText.split(" ");

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
      }}
      className={`z-40 flex items-center justify-center ${className}`}
    >
      <div className="flex max-w-[960px] items-center gap-4 rounded-full border-2 border-sky-400/50 bg-slate-950/95 px-10 py-5 shadow-[0_15px_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
        <span className="text-3xl select-none">🎙️</span>
        <p className="text-4xl font-black tracking-wide text-slate-100 whitespace-nowrap leading-none">
          {words.map((word, idx) => {
            const isKeyword =
              highlightKeyword &&
              word.toLowerCase().includes(highlightKeyword.toLowerCase());

            return (
              <span
                key={idx}
                className={`inline-block mx-2 ${
                  isKeyword
                    ? "text-amber-300 drop-shadow-[0_0_15px_rgba(252,211,77,0.8)]"
                    : "text-sky-100"
                }`}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};
