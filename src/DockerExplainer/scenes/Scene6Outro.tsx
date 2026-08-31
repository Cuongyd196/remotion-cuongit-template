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

export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const mainCardScale = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 90, mass: 0.8 },
  });

  const ctaScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  const pulse = interpolate(
    Math.sin(frame / 6),
    [-1, 1],
    [0.96, 1.04]
  );

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center px-10 text-white">
      <Audio src={staticFile("audio/DockerExplainer/scene6_outro.mp3")} />

      {/* Top Badge */}
      <div
        style={{ transform: `scale(${badgeScale})` }}
        className="flex items-center gap-3 rounded-full border-2 border-sky-400/50 bg-sky-500/15 px-8 py-3.5 backdrop-blur-md"
      >
        <span className="text-3xl font-black tracking-wider text-sky-300 uppercase">
          🚀 TỔNG KẾT &amp; HÀNH ĐỘNG
        </span>
      </div>

      {/* Center Main Card */}
      <div
        style={{ transform: `scale(${mainCardScale})` }}
        className="mt-8 flex w-full max-w-xl flex-col items-center rounded-3xl border-2 border-white/20 bg-gradient-to-b from-slate-900/90 via-sky-950/40 to-slate-950 p-8 text-center shadow-2xl backdrop-blur-xl"
      >
        <div
          style={{ transform: `scale(${pulse})` }}
          className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-[0_0_50px_rgba(56,189,248,0.5)]"
        >
          <span className="text-6xl">🐳</span>
        </div>

        <h2 className="mt-5 text-5xl font-black tracking-tight text-white">
          LÀM CHỦ DOCKER
        </h2>
        <p className="mt-2 text-2xl font-bold text-sky-300">
          Nâng tầm tư duy lập trình &amp; DevOps
        </p>

        {/* CTA Buttons */}
        <div
          style={{ transform: `scale(${ctaScale})` }}
          className="mt-6 flex w-full flex-col gap-3.5"
        >
          <div className="flex items-center justify-center gap-4 rounded-2xl border border-sky-400/40 bg-sky-500/20 py-4 font-black text-sky-200">
            <span className="text-3xl">❤️</span>
            <span className="text-2xl">Thả tim &amp; Lưu lại để xem lại</span>
          </div>

          <div className="flex items-center justify-center gap-4 rounded-2xl border border-purple-400/40 bg-purple-500/20 py-4 font-black text-purple-200">
            <span className="text-3xl">🔔</span>
            <span className="text-2xl">Follow kênh để đón xem video mới!</span>
          </div>
        </div>
      </div>

      {/* Subtitle 1 line right below CTA card */}
      <SubtitleBox
        text="Nắm vững Docker ngay hôm nay để tự tin triển khai mọi dự án. Nhớ thả tim và follow kênh để đón xem video tiếp theo nhé!"
        durationInFrames={245}
        highlightKeyword="follow"
        className="mt-64"
      />
    </AbsoluteFill>
  );
};
