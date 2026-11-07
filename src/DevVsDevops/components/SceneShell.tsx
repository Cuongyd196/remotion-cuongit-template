import React from "react";
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SubtitleBox } from "./SubtitleBox";

export type SceneProps = { text: string; audioPath: string; duration: number; speechFrames: number };

export const SceneShell: React.FC<SceneProps & { children: React.ReactNode; animateIn?: boolean; top?: number }> = ({ text, audioPath, duration, speechFrames, children, animateIn = true, top = 400 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Platforms use the first frame as the thumbnail, so the opening scene starts fully visible.
  const enter = animateIn ? spring({ frame, fps, config: { damping: 20 } }) : 1;
  const opacity = interpolate(frame, [duration - 6, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity }}>
      <Audio src={staticFile(audioPath)} />
      <div style={{ position: "absolute", left: 88, right: 88, top, height: 1460 - top, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26, opacity: enter, transform: `translateY(${(1 - enter) * 30}px)` }}>
        {children}
      </div>
      <SubtitleBox text={text} speechFrames={speechFrames} />
    </AbsoluteFill>
  );
};

export const Reveal: React.FC<{ delay: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ delay, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120 } });
  return <div style={{ ...style, opacity: p, transform: `translateY(${(1 - p) * 40}px)` }}>{children}</div>;
};
