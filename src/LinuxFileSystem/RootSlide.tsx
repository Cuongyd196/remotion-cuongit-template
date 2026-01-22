import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";

export const RootSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const textOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="bg-slate-900 flex flex-col items-center justify-center p-16">
      <div
        style={{ transform: `scale(${entrance})` }}
        className="w-64 h-64 bg-red-500 rounded-3xl flex items-center justify-center shadow-2xl mb-12"
      >
        <span className="text-9xl font-bold text-white">/</span>
      </div>
      
      <div style={{ opacity: textOpacity }} className="text-center">
        <h2 className="text-7xl font-bold text-white mb-4">Thư Mục Gốc (Root)</h2>
        <p className="text-4xl text-slate-300 max-w-2xl text-center leading-relaxed">
          Nơi bắt đầu mọi thứ.<br/>Đỉnh của cây thư mục.
        </p>
      </div>
    </AbsoluteFill>
  );
};
