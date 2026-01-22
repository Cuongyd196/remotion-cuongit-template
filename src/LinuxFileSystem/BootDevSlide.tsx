import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const BootDevSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const up1 = spring({ frame, fps, from: 1000, to: 0 });
  const up2 = spring({ frame: frame - 15, fps, from: 1000, to: 0 });

  return (
    <AbsoluteFill className="bg-slate-900 flex flex-col items-center justify-evenly p-30">
      <div 
        style={{ transform: `translateY(${up1}px)` }}
        className="w-full bg-emerald-900/40 p-10 rounded-3xl border-2 border-emerald-500 flex flex-col items-center"
      >
         <h2 className="text-7xl font-bold text-emerald-400 mb-2 font-mono">/boot</h2>
         <p className="text-4xl text-white">Khởi động hệ thống</p>
         <p className="text-3xl text-emerald-200 mt-2">Kernel, Bootloader</p>
      </div>

      <div 
        style={{ transform: `translateY(${up2}px)` }}
        className="w-full bg-indigo-900/40 p-10 rounded-3xl border-2 border-indigo-500 flex flex-col items-center"
      >
         <h2 className="text-7xl font-bold text-indigo-400 mb-2 font-mono">/dev</h2>
         <p className="text-4xl text-white">Thiết bị phần cứng</p>
         <p className="text-3xl text-indigo-200 mt-2">Ổ cứng, chuột, bàn phím</p>
      </div>
    </AbsoluteFill>
  );
};
