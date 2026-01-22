import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { z } from "zod";
import { IntroSlide } from "./IntroSlide";
import { DockerImage } from "./DockerImage";
import { DockerContainer } from "./DockerContainer";
import { DockerfileComponent } from "./DockerfileComponent";
import { DockerRegistry } from "./DockerRegistry";
import { DockerCompose } from "./DockerCompose";
import { DockerEngine } from "./DockerEngine";
import { OutroSlide } from "./OutroSlide";

export const dockerIntroSchema = z.object({});

export const DockerIntro: React.FC<z.infer<typeof dockerIntroSchema>> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Each section is 180 frames (6 seconds at 30fps)
  const sectionDuration = 180;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0D1117",
        opacity: fadeOut,
      }}
    >
      {/* Intro - 0-180 frames */}
      <Sequence from={0} durationInFrames={sectionDuration}>
        <IntroSlide />
      </Sequence>

      {/* Docker Images - 180-360 frames */}
      <Sequence from={180} durationInFrames={sectionDuration}>
        <DockerImage />
      </Sequence>

      {/* Docker Containers - 360-540 frames */}
      <Sequence from={360} durationInFrames={sectionDuration}>
        <DockerContainer />
      </Sequence>

      {/* Dockerfile - 540-720 frames */}
      <Sequence from={540} durationInFrames={sectionDuration}>
        <DockerfileComponent />
      </Sequence>

      {/* Docker Registry - 720-900 frames */}
      <Sequence from={720} durationInFrames={sectionDuration}>
        <DockerRegistry />
      </Sequence>

      {/* Docker Compose - 900-1080 frames */}
      <Sequence from={900} durationInFrames={sectionDuration}>
        <DockerCompose />
      </Sequence>

      {/* Docker Engine - 1080-1260 frames */}
      <Sequence from={1080} durationInFrames={sectionDuration}>
        <DockerEngine />
      </Sequence>

      {/* Outro - 1260-1440 frames */}
      <Sequence from={1260} durationInFrames={sectionDuration}>
        <OutroSlide />
      </Sequence>
    </AbsoluteFill>
  );
};

