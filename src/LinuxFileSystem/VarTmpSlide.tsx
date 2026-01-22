import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const VarTmpSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const up1 = spring({ frame, fps, from: 1000, to: 0 });
  const up2 = spring({ frame: frame - 15, fps, from: 1000, to: 0 });

  return (
    <AbsoluteFill className="bg-slate-900 flex flex-col items-center justify-evenly p-30">
      <div 
        style={{ transform: `translateY(${up1}px)` }}
        className="w-full bg-purple-900/40 p-10 rounded-3xl border-2 border-purple-500 flex flex-col items-center"
      >
         <h2 className="text-7xl font-bold text-purple-400 mb-2 font-mono">/var</h2>
         <p className="text-4xl text-white">Dữ liệu biến đổi</p>
         <p className="text-3xl text-purple-200 mt-2">Logs, spools, caches</p>
      </div>

      <div 
        style={{ transform: `translateY(${up2}px)` }}
        className="w-full bg-orange-900/40 p-10 rounded-3xl border-2 border-orange-500 flex flex-col items-center"
      >
         <h2 className="text-7xl font-bold text-orange-400 mb-2 font-mono">/tmp</h2>
         <p className="text-4xl text-white">File tạm thời</p>
         <p className="text-3xl text-orange-200 mt-2">Xóa khi khởi động lại</p>
      </div>
    </AbsoluteFill>
  );
};
