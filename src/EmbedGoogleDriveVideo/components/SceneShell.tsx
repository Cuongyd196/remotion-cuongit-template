import React from "react";
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SubtitleBox } from "./SubtitleBox";

const TOTAL_SCENES = 7;

export type SceneProps = { caption: string; audioPath: string; duration: number; speechFrames: number };

export const SceneShell: React.FC<SceneProps & { index: number; label: string; children: React.ReactNode; animateIn?: boolean }> = ({ index, label, caption, audioPath, duration, speechFrames, children, animateIn = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Platforms use the first frame as the thumbnail, so the opening scene starts fully visible.
  const enter = animateIn ? spring({ frame, fps, config: { damping: 20 } }) : 1;
  const opacity = interpolate(frame, [duration - 6, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity }}>
      <Audio src={staticFile(audioPath)} />
      <div style={{ position: "absolute", left: 88, right: 88, top: 290, fontSize: 28, letterSpacing: 3, color: "#54f0ca", fontWeight: 800 }}>{label}</div>
      <div style={{ position: "absolute", left: 88, right: 88, top: 350, height: 1110, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28, opacity: enter, transform: `translateY(${(1 - enter) * 30}px)` }}>{children}</div>
      <SubtitleBox caption={caption} speechFrames={speechFrames} />
      <div style={{ position: "absolute", bottom: 215, right: 90, fontSize: 24, color: "#8294ab", letterSpacing: 4 }}>0{index + 1} / 0{TOTAL_SCENES}</div>
    </AbsoluteFill>
  );
};

export const Reveal: React.FC<{ delay: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ delay, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120 } });
  return <div style={{ ...style, opacity: p, transform: `translateY(${(1 - p) * 45}px)` }}>{children}</div>;
};
