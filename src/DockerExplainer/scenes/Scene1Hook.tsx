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

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge spring
  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  // Title spring
  const titleY = spring({
    frame: frame - 6,
    fps,
    from: 60,
    to: 0,
    config: { damping: 14, stiffness: 90 },
  });
  const titleOpacity = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating Whale Icon
  const whaleScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  const floatOffset = Math.sin(frame / 12) * 15;

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center px-10 text-white">
      <Audio src={staticFile("audio/DockerExplainer/scene1_hook.mp3")} />

      {/* Top Badge */}
      <div
        style={{
          transform: `scale(${badgeScale})`,
        }}
        className="flex items-center gap-3 rounded-full border border-sky-400/40 bg-sky-500/10 px-8 py-3.5 backdrop-blur-md"
      >
        <span className="h-4 w-4 animate-ping rounded-full bg-sky-400" />
        <span className="text-3xl font-black tracking-widest text-sky-300 uppercase">
          DEVOPS &amp; BACKEND EXPLAINER
        </span>
      </div>

      {/* Center Visuals */}
      <div className="mt-10 flex flex-col items-center gap-6">
        {/* Floating Docker Whale Graphic */}
        <div
          style={{
            transform: `scale(${whaleScale}) translateY(${floatOffset}px)`,
          }}
          className="relative flex h-52 w-52 items-center justify-center rounded-3xl border-2 border-sky-400/40 bg-gradient-to-br from-sky-500/25 via-blue-600/15 to-transparent p-6 shadow-[0_0_90px_rgba(56,189,248,0.45)] backdrop-blur-xl"
        >
          {/* Custom SVG Docker Whale/Container Icon */}
          <svg viewBox="0 0 100 100" className="h-36 w-36 drop-shadow-lg" fill="none">
            <rect x="22" y="24" width="14" height="12" rx="2" fill="#38BDF8" />
            <rect x="39" y="24" width="14" height="12" rx="2" fill="#38BDF8" />
            <rect x="56" y="24" width="14" height="12" rx="2" fill="#38BDF8" />
            
            <rect x="22" y="39" width="14" height="12" rx="2" fill="#0284C7" />
            <rect x="39" y="39" width="14" height="12" rx="2" fill="#38BDF8" />
            <rect x="56" y="39" width="14" height="12" rx="2" fill="#0284C7" />
            <rect x="73" y="39" width="14" height="12" rx="2" fill="#38BDF8" />

            <path
              d="M10 56C12 72 26 84 48 84C72 84 88 70 92 56C80 54 75 58 68 56C64 54 60 56 50 56C36 56 30 54 10 56Z"
              fill="#0284C7"
            />
            <circle cx="82" cy="62" r="2.5" fill="white" />
            <path
              d="M84 48C84 44 88 40 92 42"
              stroke="#38BDF8"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Main Hook Titles */}
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
          className="text-center"
        >
          <h1 className="text-8xl font-black tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
              DOCKER
            </span>{" "}
            LÀ GÌ?
          </h1>
          <p className="mt-4 text-4xl font-bold text-slate-200">
            Tại sao Dev nào cũng bắt buộc phải biết?
          </p>
        </div>
      </div>

      {/* Subtitle 1 line right below center content */}
      <SubtitleBox
        text="Bạn có biết Docker thực chất là gì và tại sao mọi lập trình viên đều bắt buộc phải biết nó không?"
        durationInFrames={165}
        highlightKeyword="Docker"
        className="mt-64"
      />
    </AbsoluteFill>
  );
};
