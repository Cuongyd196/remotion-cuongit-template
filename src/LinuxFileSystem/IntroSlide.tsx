import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const IntroSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 12 },
  });

  const titleY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-slate-900 flex items-center justify-center p-16">
      <div style={{ opacity }} className="text-center">
        <h1
          style={{ transform: `scale(${scale}) translateY(${titleY}px)` }}
          className="text-9xl font-bold text-white mb-8 drop-shadow-lg"
        >
          Hệ Thống File Linux
        </h1>
        <h2 className="text-5xl text-blue-400 font-mono mt-4">
          Tổng quan về hệ thống file Linux
        </h2>
        <div className="mt-12 text-6xl">
            🐧📂
        </div>
      </div>
    </AbsoluteFill>
  );
};
