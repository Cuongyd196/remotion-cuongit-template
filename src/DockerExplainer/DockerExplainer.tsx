import React from "react";
import {
  AbsoluteFill,
  Series,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DockerExplainerProps } from "./types";
import { audioManifest } from "./audioData";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Problem } from "./scenes/Scene2Problem";
import { Scene3Container } from "./scenes/Scene3Container";
import { Scene4ImageDockerfile } from "./scenes/Scene4ImageDockerfile";
import { Scene5Benefits } from "./scenes/Scene5Benefits";
import { Scene6Outro } from "./scenes/Scene6Outro";
import { BrandHeader } from "./components/BrandHeader";

export const DockerExplainer: React.FC<DockerExplainerProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Gentle fade in at start and fade out at end
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const opacity = fadeIn * fadeOut;

  // Scene durations dynamically mapped from audioManifest (+3 frames buffer for snappy, seamless transition)
  const d1 = audioManifest.scenes[0].durationInFrames + 3;
  const d2 = audioManifest.scenes[1].durationInFrames + 3;
  const d3 = audioManifest.scenes[2].durationInFrames + 3;
  const d4 = audioManifest.scenes[3].durationInFrames + 3;
  const d5 = audioManifest.scenes[4].durationInFrames + 3;
  const d6 = audioManifest.scenes[5].durationInFrames + 10;


  return (
    <AbsoluteFill
      style={{ opacity }}
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black font-sans text-white select-none"
    >
      {/* Top Center Channel Brand Header (Safely below platform search bar) */}
      <BrandHeader channelName="CƯỜNG IT" />

      {/* Background Animated Subtle Glows */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-sky-600/15 blur-[140px]" />
      <div className="absolute top-1/2 -right-40 h-[700px] w-[700px] rounded-full bg-indigo-600/15 blur-[160px]" />
      <div className="absolute -bottom-40 left-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/15 blur-[140px]" />

      {/* Series of 6 Scenes */}
      <Series>
        {/* Scene 1: Hook (0s - 5.5s) */}
        <Series.Sequence durationInFrames={d1}>
          <Scene1Hook />
        </Series.Sequence>

        {/* Scene 2: Problem (5.5s - 12s) */}
        <Series.Sequence durationInFrames={d2}>
          <Scene2Problem />
        </Series.Sequence>

        {/* Scene 3: Container (12s - 19.5s) */}
        <Series.Sequence durationInFrames={d3}>
          <Scene3Container />
        </Series.Sequence>

        {/* Scene 4: Image & Dockerfile (19.5s - 27s) */}
        <Series.Sequence durationInFrames={d4}>
          <Scene4ImageDockerfile />
        </Series.Sequence>

        {/* Scene 5: Benefits (27s - 35s) */}
        <Series.Sequence durationInFrames={d5}>
          <Scene5Benefits />
        </Series.Sequence>

        {/* Scene 6: Outro & CTA (35s - 45s) */}
        <Series.Sequence durationInFrames={d6}>
          <Scene6Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
