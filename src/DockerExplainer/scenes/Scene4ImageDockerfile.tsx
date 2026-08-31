import React from "react";
import {
  AbsoluteFill,
  Audio,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SubtitleBox } from "../components/SubtitleBox";

export const Scene4ImageDockerfile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Step 1: Dockerfile
  const step1Scale = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Arrow 1
  const arrow1Scale = spring({
    frame: frame - 18,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  // Step 2: Docker Image
  const step2Scale = spring({
    frame: frame - 26,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Arrow 2
  const arrow2Scale = spring({
    frame: frame - 38,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  // Step 3: Containers Replicas
  const step3Scale = spring({
    frame: frame - 46,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center px-10 text-white">
      <Audio src={staticFile("audio/DockerExplainer/scene4_image_dockerfile.mp3")} />

      {/* Top Header Badge */}
      <div
        style={{ transform: `scale(${badgeScale})` }}
        className="flex items-center gap-3 rounded-full border-2 border-purple-400/50 bg-purple-500/15 px-8 py-3.5 backdrop-blur-md"
      >
        <span className="text-3xl font-black tracking-wider text-purple-300 uppercase">
          ⚡ QUY TRÌNH: TỪ CODE ĐẾN CONTAINER
        </span>
      </div>

      {/* Center Flow Diagram (Vertical 3-Step) */}
      <div className="mt-8 flex w-full max-w-xl flex-col items-center gap-3">
        {/* Step 1: Dockerfile */}
        <div
          style={{ transform: `scale(${step1Scale})` }}
          className="flex w-full items-center gap-5 rounded-3xl border-2 border-indigo-400/35 bg-slate-900/90 p-5 shadow-lg backdrop-blur-md"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20 text-4xl">
            📄
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-black text-indigo-300">Dockerfile</h3>
              <span className="rounded-full bg-indigo-500/30 px-4 py-1 text-base font-black text-indigo-200">
                Bước 1: Công thức
              </span>
            </div>
            <p className="text-xl font-medium text-slate-300 mt-1">Chỉ thị build môi trường &amp; code</p>
          </div>
        </div>

        {/* Down Arrow 1 */}
        <div
          style={{ transform: `scale(${arrow1Scale})` }}
          className="text-2xl font-bold text-purple-400"
        >
          ⬇️ <span className="text-lg font-mono font-bold text-slate-300">docker build</span>
        </div>

        {/* Step 2: Docker Image */}
        <div
          style={{ transform: `scale(${step2Scale})` }}
          className="flex w-full items-center gap-5 rounded-3xl border-2 border-purple-400/45 bg-gradient-to-r from-purple-950/60 to-slate-900/90 p-5 shadow-xl backdrop-blur-md"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/20 text-4xl">
            💿
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-black text-purple-300">Docker Image</h3>
              <span className="rounded-full bg-purple-500/30 px-4 py-1 text-base font-black text-purple-200">
                Bước 2: Bản Snapshot
              </span>
            </div>
            <p className="text-xl font-medium text-slate-300 mt-1">Bản đóng gói bất biến sẵn sàng chạy</p>
          </div>
        </div>

        {/* Down Arrow 2 */}
        <div
          style={{ transform: `scale(${arrow2Scale})` }}
          className="text-2xl font-bold text-sky-400"
        >
          ⬇️ <span className="text-lg font-mono font-bold text-slate-300">docker run (x1000)</span>
        </div>

        {/* Step 3: Containers */}
        <div
          style={{ transform: `scale(${step3Scale})` }}
          className="flex w-full items-center gap-5 rounded-3xl border-2 border-sky-400/45 bg-gradient-to-r from-sky-950/60 to-slate-900/90 p-5 shadow-xl backdrop-blur-md"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/20 text-4xl">
            🚀
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-black text-sky-300">Containers</h3>
              <span className="rounded-full bg-sky-500/30 px-4 py-1 text-base font-black text-sky-200">
                Bước 3: Chạy thực tế
              </span>
            </div>
            <p className="text-xl font-medium text-slate-300 mt-1">Nhân bản hàng nghìn container trong vài giây</p>
          </div>
        </div>
      </div>

      {/* Subtitle 1 line right below flow diagram */}
      <SubtitleBox
        text="Chỉ với một file Dockerfile đơn giản, bạn tạo ra Docker Image và có thể nhân bản hàng nghìn Container giống hệt nhau trong tích tắc."
        durationInFrames={218}
        highlightKeyword="Dockerfile"
        className="mt-64"
      />
    </AbsoluteFill>
  );
};
