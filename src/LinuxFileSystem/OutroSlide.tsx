import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const OutroSlide: React.FC = () => {
  const frame = useCurrentFrame();
  
  
  const opacity = interpolate(frame, [0, 20], [0, 1]);

  return (
    <AbsoluteFill className="bg-black flex items-center justify-center">
      <div style={{ opacity }} className="text-center p-16">
        <h2 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 mb-12">
          "Mọi thứ đều là file"
        </h2>
        
        <div className="bg-slate-800/80 p-8 rounded-2xl mx-auto max-w-xl">
            <p className="text-4xl text-white font-semibold">
                Cảm ơn bạn đã xem!
            </p>
            <p className="text-2xl text-slate-400 mt-4">
                Follow để biết thêm về Linux
            </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
