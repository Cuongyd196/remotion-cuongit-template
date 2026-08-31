import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface BrandHeaderProps {
  channelName?: string;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  channelName = "CƯỜNG IT",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "150px",
        left: "50%",
        transform: `translateX(-50%) scale(${scale})`,
        opacity,
      }}
      className="z-50 flex items-center gap-3.5 rounded-full border-2 border-sky-400/40 bg-slate-950/90 px-8 py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 font-black text-white text-lg shadow-[0_0_15px_rgba(56,189,248,0.6)]">
        ⚡
      </div>
      <span className="text-3xl font-black tracking-widest bg-gradient-to-r from-sky-300 via-white to-blue-300 bg-clip-text text-transparent">
        {channelName}
      </span>
    </div>
  );
};
