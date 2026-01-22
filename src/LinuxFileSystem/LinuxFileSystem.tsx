import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { IntroSlide } from "./IntroSlide";
import { OverviewSlide } from "./OverviewSlide";
import { RootSlide } from "./RootSlide";
import { BinEtcSlide } from "./BinEtcSlide";
import { RootLibSlide } from "./RootLibSlide";
import { BootDevSlide } from "./BootDevSlide";
import { HomeSlide } from "./HomeSlide";
import { VarTmpSlide } from "./VarTmpSlide";
import { OutroSlide } from "./OutroSlide";
import { z } from "zod";

export const linuxFileSystemSchema = z.object({});

export const LinuxFileSystem: React.FC = () => {
    // 30fps
    // Total approx 40s = 1200 frames


  return (
    <AbsoluteFill className="bg-slate-950">
      {/* 0s - 4s: Intro */}
      <Sequence from={0} durationInFrames={120}>
        <IntroSlide />
      </Sequence>

      {/* 4s - 9s: Overview (New) */}
      <Sequence from={120} durationInFrames={150}>
        <OverviewSlide />
      </Sequence>

      {/* 9s - 14s: Root */}
      <Sequence from={270} durationInFrames={150}>
        <RootSlide />
      </Sequence>

      {/* 14s - 20s: Bin/Etc */}
      <Sequence from={420} durationInFrames={180}>
        <BinEtcSlide />
      </Sequence>

      {/* 20s - 26s: Root/Lib */}
      <Sequence from={600} durationInFrames={180}>
        <RootLibSlide />
      </Sequence>

      {/* 26s - 32s: Boot/Dev (New) */}
      <Sequence from={780} durationInFrames={180}>
        <BootDevSlide />
      </Sequence>

      {/* 32s - 38s: Home */}
      <Sequence from={960} durationInFrames={180}>
        <HomeSlide />
      </Sequence>

      {/* 38s - 46s: Var/Tmp */}
      <Sequence from={1140} durationInFrames={240}>
        <VarTmpSlide />
      </Sequence>

      {/* 46s - 51s: Outro */}
      <Sequence from={1380} durationInFrames={150}>
        <OutroSlide />
      </Sequence>
      
    </AbsoluteFill>
  );
};
