import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const BinEtcSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftEntrance = spring({
    frame,
    fps,
    from: -500,
    to: 0,
    config: { damping: 14 },
  });

  const rightEntrance = spring({
    frame: frame - 20,
    fps,
    from: 500,
    to: 0,
    config: { damping: 14 },
    delay: 20
  });

  return (
    <AbsoluteFill className="bg-slate-900 p-30 flex flex-col justify-center gap-16">
      <div 
        style={{ transform: `translateX(${leftEntrance}px)` }}
        className="bg-blue-600/20 border-l-8 border-blue-500 p-8 rounded-r-xl"
      >
        <h2 className="text-7xl font-bold text-blue-400 mb-4 font-mono">/bin</h2>
        <p className="text-4xl text-white">Chương trình thực thi</p>
        <p className="text-3xl text-slate-400 mt-2">ls, cp, cat, grep</p>
      </div>

      <div 
        style={{ transform: `translateX(${rightEntrance}px)` }}
        className="bg-yellow-600/20 border-r-8 border-yellow-500 p-8 rounded-l-xl text-right self-end w-full"
      >
        <h2 className="text-7xl font-bold text-yellow-400 mb-4 font-mono">/etc</h2>
        <p className="text-4xl text-white">Cấu hình hệ thống</p>
        <p className="text-3xl text-slate-400 mt-2">Nơi lưu cài đặt</p>
      </div>
    </AbsoluteFill>
  );
};
