import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const RootLibSlide: React.FC = () => {
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
        className="bg-red-900/40 border-l-8 border-red-500 p-8 rounded-r-xl"
      >
        <h2 className="text-7xl font-bold text-red-400 mb-4 font-mono">/root</h2>
        <p className="text-4xl text-white">Thư mục Admin</p>
        <p className="text-3xl text-slate-400 mt-2">Nhà của Super User</p>
      </div>

      <div 
        style={{ transform: `translateX(${rightEntrance}px)` }}
        className="bg-teal-900/40 border-r-8 border-teal-500 p-8 rounded-l-xl text-right self-end w-full"
      >
        <h2 className="text-7xl font-bold text-teal-400 mb-4 font-mono">/lib</h2>
        <p className="text-4xl text-white">Thư viện hệ thống</p>
        <p className="text-3xl text-slate-400 mt-2">Giống DLL trong Windows</p>
      </div>
    </AbsoluteFill>
  );
};
