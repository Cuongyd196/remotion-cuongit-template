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

export const Scene3Container: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Top badge
  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Main Container Box scale & glow
  const boxScale = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 85, mass: 0.9 },
  });

  // Staggered items inside container
  const item1X = spring({
    frame: frame - 16,
    fps,
    from: -60,
    to: 0,
    config: { damping: 14, stiffness: 110 },
  });
  const item2X = spring({
    frame: frame - 22,
    fps,
    from: -60,
    to: 0,
    config: { damping: 14, stiffness: 110 },
  });
  const item3X = spring({
    frame: frame - 28,
    fps,
    from: -60,
    to: 0,
    config: { damping: 14, stiffness: 110 },
  });

  const glowOpacity = interpolate(
    Math.sin(frame / 8),
    [-1, 1],
    [0.4, 0.8]
  );

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center px-10 text-white">
      <Audio src={staticFile("audio/DockerExplainer/scene3_container.mp3")} />

      {/* Top Header Badge */}
      <div
        style={{ transform: `scale(${badgeScale})` }}
        className="flex items-center gap-3 rounded-full border-2 border-sky-400/50 bg-sky-500/15 px-8 py-3.5 backdrop-blur-md"
      >
        <span className="text-3xl font-black tracking-wider text-sky-300 uppercase">
          💡 GIẢI PHÁP: DOCKER CONTAINER
        </span>
      </div>

      {/* Center Visual: The All-in-One Container Box */}
      <div
        style={{ transform: `scale(${boxScale})` }}
        className="relative mt-8 flex w-full max-w-xl flex-col items-center rounded-3xl border-2 border-sky-400/50 bg-gradient-to-b from-sky-950/80 via-slate-900/90 to-slate-950 p-8 shadow-2xl backdrop-blur-2xl"
      >
        {/* Glow behind */}
        <div
          style={{ opacity: glowOpacity }}
          className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-r from-sky-500/30 to-blue-600/30 blur-2xl"
        />

        {/* Container Header */}
        <div className="flex items-center gap-4">
          <span className="text-6xl">📦</span>
          <div>
            <h2 className="text-5xl font-black tracking-tight text-white">
              CONTAINER
            </h2>
            <p className="text-2xl font-bold text-sky-300">Độc lập &bull; Siêu nhẹ &bull; Nhất quán</p>
          </div>
        </div>

        {/* Internal Packaged Elements */}
        <div className="mt-6 flex w-full flex-col gap-4">
          {/* Element 1: Source Code */}
          <div
            style={{ transform: `translateX(${item1X}px)` }}
            className="flex items-center justify-between rounded-2xl border-2 border-emerald-400/35 bg-emerald-950/45 px-6 py-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📝</span>
              <span className="text-3xl font-black text-emerald-300">Mã nguồn (Source)</span>
            </div>
            <span className="rounded-xl bg-emerald-500/25 px-4 py-1.5 text-xl font-black text-emerald-300">Node / Python</span>
          </div>

          {/* Element 2: Dependencies & Libraries */}
          <div
            style={{ transform: `translateX(${item2X}px)` }}
            className="flex items-center justify-between rounded-2xl border-2 border-amber-400/35 bg-amber-950/45 px-6 py-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <span className="text-3xl font-black text-amber-300">Thư viện Runtime</span>
            </div>
            <span className="rounded-xl bg-amber-500/25 px-4 py-1.5 text-xl font-black text-amber-300">node_modules</span>
          </div>

          {/* Element 3: System Configuration */}
          <div
            style={{ transform: `translateX(${item3X}px)` }}
            className="flex items-center justify-between rounded-2xl border-2 border-indigo-400/35 bg-indigo-950/45 px-6 py-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚙️</span>
              <span className="text-3xl font-black text-indigo-300">Hệ điều hành OS</span>
            </div>
            <span className="rounded-xl bg-indigo-500/25 px-4 py-1.5 text-xl font-black text-indigo-300">Alpine Linux</span>
          </div>
        </div>
      </div>

      {/* Subtitle 1 line right below box */}
      <SubtitleBox
        text="Docker giải quyết triệt để vấn đề này bằng Container: đóng gói code, thư viện và môi trường vào một khối độc lập siêu nhẹ."
        durationInFrames={211}
        highlightKeyword="Container"
        className="mt-64"
      />
    </AbsoluteFill>
  );
};
