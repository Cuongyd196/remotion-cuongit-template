import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SubtitleBox } from "../components/SubtitleBox";

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge spring
  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Problem Quote Card spring
  const cardScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 90 },
  });

  // VS Comparison Cards
  const leftCardX = spring({
    frame: frame - 15,
    fps,
    from: -100,
    to: 0,
    config: { damping: 14, stiffness: 100 },
  });
  const rightCardX = spring({
    frame: frame - 22,
    fps,
    from: 100,
    to: 0,
    config: { damping: 14, stiffness: 100 },
  });

  const warningPulse = interpolate(
    Math.sin(frame / 6),
    [-1, 1],
    [0.95, 1.05]
  );

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center px-10 text-white">
      <Audio src={staticFile("audio/DockerExplainer/scene2_problem.mp3")} />

      {/* Top Header Badge */}
      <div
        style={{ transform: `scale(${badgeScale})` }}
        className="flex items-center gap-3 rounded-full border-2 border-red-500/50 bg-red-500/15 px-8 py-3.5 backdrop-blur-md"
      >
        <span className="text-3xl font-black tracking-wider text-red-400 uppercase">
          ⚠️ NỖI ĐAU KHI TRIỂN KHAI CODE
        </span>
      </div>

      {/* Center Content Group */}
      <div className="mt-8 flex w-full flex-col items-center gap-6">
        {/* Quote Card */}
        <div
          style={{ transform: `scale(${cardScale})` }}
          className="w-full max-w-xl rounded-3xl border-2 border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-slate-900/95 to-amber-500/15 p-9 text-center shadow-2xl backdrop-blur-xl"
        >
          <div className="text-6xl">😅</div>
          <h2 className="mt-4 text-5xl font-black text-amber-300 leading-tight">
            &quot;Ơ kìa, trên máy em vẫn chạy ngon mà?!&quot;
          </h2>
          <p className="mt-3 text-3xl font-semibold text-slate-300">
            Cơn ác mộng khi bàn giao giữa các môi trường
          </p>
        </div>

        {/* Comparison: Local Machine vs Server */}
        <div className="grid w-full max-w-xl grid-cols-2 gap-6">
          {/* Left: Local Machine (OK) */}
          <div
            style={{ transform: `translateX(${leftCardX}px)` }}
            className="flex flex-col items-center rounded-3xl border-2 border-emerald-500/40 bg-emerald-950/40 p-7 text-center shadow-xl backdrop-blur-md"
          >
            <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-emerald-500/20 text-4xl">
              💻
            </div>
            <h3 className="mt-3 text-3xl font-black text-emerald-400">Local Machine</h3>
            <span className="mt-3 inline-flex items-center rounded-full bg-emerald-500/25 px-5 py-1.5 text-2xl font-black text-emerald-300">
              ✓ Node v20 / macOS
            </span>
          </div>

          {/* Right: Production Server (Error) */}
          <div
            style={{
              transform: `translateX(${rightCardX}px) scale(${warningPulse})`,
            }}
            className="flex flex-col items-center rounded-3xl border-2 border-rose-500/50 bg-rose-950/50 p-7 text-center shadow-xl shadow-rose-950/60 backdrop-blur-md"
          >
            <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-rose-500/20 text-4xl">
              💥
            </div>
            <h3 className="mt-3 text-3xl font-black text-rose-400">Server Deploy</h3>
            <span className="mt-3 inline-flex items-center rounded-full bg-rose-500/25 px-5 py-1.5 text-2xl font-black text-rose-300">
              ✗ Node v16 / Crash
            </span>
          </div>
        </div>
      </div>

      {/* Subtitle 1 line right below center group */}
      <SubtitleBox
        text="Trước đây, câu nói 'trên máy tôi vẫn chạy được' luôn là cơn ác mộng khi bàn giao code giữa các môi trường khác nhau."
        durationInFrames={187}
        highlightKeyword="chạy"
        className="mt-64"
      />
    </AbsoluteFill>
  );
};
