import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const OverviewSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Root entrance
  const rootScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const allDirs = [
    // Highlighted directories (Main ones)
    { name: "bin", highlight: true },
    { name: "etc", highlight: true },
    { name: "home", highlight: true },
    { name: "root", highlight: true },
    { name: "lib", highlight: true },
    { name: "boot", highlight: true },
    { name: "dev", highlight: true },
    { name: "var", highlight: true },
    { name: "tmp", highlight: true },
    
    // Other directories
    { name: "media", highlight: false },
    { name: "mnt", highlight: false },
    { name: "opt", highlight: false },
    { name: "proc", highlight: false },
    { name: "run", highlight: false },
    { name: "sbin", highlight: false },
    { name: "srv", highlight: false },
    { name: "sys", highlight: false },
    { name: "usr", highlight: false },
  ];

  return (
    <AbsoluteFill className="bg-slate-900 flex flex-col items-center pt-24 p-8">
      
      <h2 className="text-5xl font-bold text-white mb-8 animate-pulse text-center">
        Full Linux Tree
      </h2>

      <div className="relative w-full max-w-4xl flex flex-col items-center">
        
        {/* Root Node */}
        <div 
            style={{ transform: `scale(${rootScale})` }}
            className="z-20 bg-red-600 w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-slate-700 mb-4"
        >
          <span className="text-5xl font-bold text-white">/</span>
        </div>

        {/* Tree Connection Line */}
        <div 
            style={{ height: Math.min(60, frame * 10) + 'px' }}
            className="w-2 bg-slate-600 mb-6 transition-all duration-75"
        />

        {/* Dense Grid */}
        <div className="grid grid-cols-3 gap-4 w-full px-4">
            {allDirs.map((dir, index) => {
                const delay = 10 + index * 2; // Fast stagger
                const scale = spring({
                    frame: frame - delay,
                    fps,
                    config: { stiffness: 120, damping: 14 }
                });

                const isHighlighted = dir.highlight;

                return (
                    <div 
                        key={dir.name}
                        style={{ transform: `scale(${scale})` }}
                        className={`
                            p-4 rounded-xl border flex items-center gap-3 shadow-md
                            ${isHighlighted 
                                ? "bg-slate-800 border-blue-500/50 shadow-blue-900/20" 
                                : "bg-slate-800/50 border-slate-700 opacity-60 grayscale"}
                        `}
                    >
                        <span className="text-2xl">
                            {isHighlighted ? '📂' : '📁'}
                        </span>
                        <span className={`font-mono font-bold text-xl ${isHighlighted ? 'text-white' : 'text-slate-400'}`}>
                            /{dir.name}
                        </span>
                    </div>
                );
            })}
        </div>
        
        {/* Caption */}
        <div style={{ opacity: spring({frame: frame - 60, fps}) }} className="mt-12 bg-black/40 p-6 rounded-xl backdrop-blur-sm border border-slate-700 mx-8">
            <p className="text-3xl text-center text-slate-200 leading-relaxed">
                Hệ thống file Linux rất lớn, nhưng chúng ta sẽ tập trung vào các thư mục chính!
            </p>
        </div>

      </div>
    </AbsoluteFill>
  );
};
