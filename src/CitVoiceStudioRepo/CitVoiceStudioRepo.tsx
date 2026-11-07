import React from "react";
import { AbsoluteFill, Series, useCurrentFrame } from "remotion";
import { useVietnameseFont, vietnameseFontFamily } from "./useVietnameseFont";
import { audioManifest } from "./audioData";
import { BrandHeader } from "./components/BrandHeader";
import { SceneProps } from "./components/SceneShell";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Pain } from "./scenes/Scene2Pain";
import { Scene3Intro } from "./scenes/Scene3Intro";
import { Scene4Usage } from "./scenes/Scene4Usage";
import { Scene5Features } from "./scenes/Scene5Features";
import { Scene6Origin } from "./scenes/Scene6Origin";
import { Scene7Outro } from "./scenes/Scene7Outro";
import { CitVoiceStudioRepoProps } from "./types";

// The manifest adds 10 padding frames per scene; keep 3 after speech for a snappy cut.
const PADDING_FRAMES = 10;
const BUFFER_FRAMES = 3;
const OUTRO_HOLD_FRAMES = 40;
const lastIndex = audioManifest.scenes.length - 1;

export const sceneDurations = audioManifest.scenes.map((scene, i) => scene.durationInFrames - PADDING_FRAMES + BUFFER_FRAMES + (i === lastIndex ? OUTRO_HOLD_FRAMES : 0));
export const citVoiceStudioRepoDuration = sceneDurations.reduce((sum, frames) => sum + frames, 0);

const sceneComponents: React.FC<SceneProps>[] = [Scene1Hook, Scene2Pain, Scene3Intro, Scene4Usage, Scene5Features, Scene6Origin];

export const CitVoiceStudioRepo: React.FC<CitVoiceStudioRepoProps> = ({ channelName }) => {
  useVietnameseFont();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 0% 30%,#123f46 0%,transparent 55%),radial-gradient(ellipse at 100% 75%,#1d284b 0%,transparent 55%),#070e19", color: "#f3f7ff", fontFamily: vietnameseFontFamily, whiteSpace: "pre-line" }}>
      <AbsoluteFill style={{ backgroundImage: "linear-gradient(#83b6ca0b 1px,transparent 1px),linear-gradient(90deg,#83b6ca0b 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
      <BrandHeader channelName={channelName} />
      <Series>
        {audioManifest.scenes.map((scene, i) => {
          const props: SceneProps = { text: scene.text, audioPath: scene.audioPath, duration: sceneDurations[i], speechFrames: scene.durationInFrames - PADDING_FRAMES };
          const Scene = sceneComponents[i];
          return (
            <Series.Sequence key={scene.id} durationInFrames={sceneDurations[i]}>
              {i === lastIndex ? <Scene7Outro {...props} channelName={channelName} /> : <Scene {...props} />}
            </Series.Sequence>
          );
        })}
      </Series>
      <div style={{ position: "absolute", left: 88, right: 88, bottom: 190, height: 5, background: "#ffffff16" }}>
        <div style={{ width: `${(frame / citVoiceStudioRepoDuration) * 100}%`, height: "100%", background: "#54f0ca" }} />
      </div>
    </AbsoluteFill>
  );
};
