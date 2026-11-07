import React from "react";
import { useCurrentFrame } from "remotion";

const MAX_WORDS = 6;

// Break at punctuation when possible so each caption reads as one phrase.
function toChunks(text: string): string[] {
  const chunks: string[] = [];
  let current: string[] = [];
  const words = text.split(/\s+/);
  words.forEach((word, i) => {
    current.push(word);
    // Keep a name and its number together, as in "Supertonic 3".
    if (/^\d/.test(words[i + 1] ?? "")) return;
    if (current.length >= MAX_WORDS || (current.length >= 3 && /[,.?!]$/.test(word))) {
      chunks.push(current.join(" "));
      current = [];
    }
  });
  if (current.length > 0) chunks.push(current.join(" "));
  return chunks;
}

export const SubtitleBox: React.FC<{ text: string; speechFrames: number }> = ({ text, speechFrames }) => {
  const frame = useCurrentFrame();
  const chunks = toChunks(text);
  // Longer phrases take longer to say, so time captions by character count.
  const totalChars = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const position = (frame / Math.max(1, speechFrames)) * totalChars;
  let elapsed = 0;
  let active = chunks[chunks.length - 1];
  for (const chunk of chunks) {
    elapsed += chunk.length;
    if (position < elapsed) {
      active = chunk;
      break;
    }
  }
  return (
    <div style={{ position: "absolute", top: 1520, left: 45, right: 45, textAlign: "center" }}>
      <div style={{ display: "inline-block", whiteSpace: "nowrap", fontSize: 37, fontWeight: 800, padding: "23px 29px", border: "2px solid #54f0ca60", background: "#091925", borderRadius: 60 }}>{active}</div>
    </div>
  );
};
