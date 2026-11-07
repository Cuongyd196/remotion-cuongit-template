import React from "react";
import { useCurrentFrame } from "remotion";

// A digit takes about five letters to say aloud, so "720p" lasts longer than it looks.
const speechWeight = (chunk: string) => chunk.length + 5 * (chunk.match(/\d/g)?.length ?? 0);

export const SubtitleBox: React.FC<{ caption: string; speechFrames: number }> = ({ caption, speechFrames }) => {
  const frame = useCurrentFrame();
  const chunks = caption.split("|").map((chunk) => chunk.trim());
  const total = chunks.reduce((sum, chunk) => sum + speechWeight(chunk), 0);
  const position = (frame / Math.max(1, speechFrames)) * total;
  let elapsed = 0;
  let active = chunks[chunks.length - 1];
  for (const chunk of chunks) {
    elapsed += speechWeight(chunk);
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
