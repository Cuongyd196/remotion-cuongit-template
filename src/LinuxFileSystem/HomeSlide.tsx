import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const HomeSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill className="bg-slate-900 flex items-center justify-center p-16">
      <div 
        style={{ transform: `scale(${scale})` }}
        className="flex flex-col items-center"
      >
        <div className="bg-green-500 p-8 rounded-full mb-8 shadow-green-500/50 shadow-2xl">
            <span className="text-9xl">🏠</span>
        </div>
        <h2 className="text-8xl font-bold text-white mb-8 font-mono">/home</h2>
        
        <div className="flex gap-8 mt-8">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <p className="text-4xl text-blue-300 font-mono">/home/alice</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <p className="text-4xl text-purple-300 font-mono">/home/bob</p>
            </div>
        </div>
        <p className="text-4xl text-slate-400 mt-8">Thư mục cá nhân người dùng</p>
      </div>
    </AbsoluteFill>
  );
};
