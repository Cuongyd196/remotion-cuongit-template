import React from "react";
import { AbsoluteFill, Series, useCurrentFrame } from "remotion";
import { SfxCue, SfxTrack } from "../sfx/SfxTrack";
import { audioManifest } from "./audioData";
import { BrandHeader } from "./components/BrandHeader";
import { SceneProps } from "./components/SceneShell";
import { VersusBar } from "./components/VersusBar";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Core } from "./scenes/Scene2Core";
import { Scene3A } from "./scenes/Scene3A";
import { Scene4B } from "./scenes/Scene4B";
import { Scene5Versus } from "./scenes/Scene5Versus";
import { Scene6Verdict } from "./scenes/Scene6Verdict";
import { sideOpacity } from "./sideCues";
import { DevVsDevopsProps } from "./types";
import { useVietnameseFont, vietnameseFontFamily } from "./useVietnameseFont";

// The manifest adds 10 padding frames per scene; keep 3 after speech for a snappy cut.
const PADDING_FRAMES = 10;
const BUFFER_FRAMES = 3;
const OUTRO_HOLD_FRAMES = 40;
const lastIndex = audioManifest.scenes.length - 1;

export const sceneDurations = audioManifest.scenes.map((scene, i) => scene.durationInFrames - PADDING_FRAMES + BUFFER_FRAMES + (i === lastIndex ? OUTRO_HOLD_FRAMES : 0));
export const devVsDevopsDuration = sceneDurations.reduce((sum, frames) => sum + frames, 0);

const sceneComponents: React.FC<SceneProps>[] = [Scene1Hook, Scene2Core, Scene3A, Scene4B, Scene5Versus];

// When each item appears, as a share of the scene's speech. Matches the Reveal delays in the scenes.
const revealSounds: [number, SfxCue["sound"]][][] = [
  [],
  [[0.2, "pop"], [0.45, "pop"]],
  [[0.38, "pop"], [0.66, "pop"]],
  [[0.38, "pop"], [0.66, "pop"]],
  [[0.3, "pop"], [0.64, "pop"]],
  [[0.02, "ding"], [0.3, "ding"], [0.72, "chime"]],
];

// Play the scene-change sound in the short silence before the next line starts.
const SCENE_SOUND_LEAD_FRAMES = 3;

let sfxSceneStart = 0;
const sfxCues: SfxCue[] = audioManifest.scenes.flatMap((scene, i) => {
  const start = sfxSceneStart;
  sfxSceneStart += sceneDurations[i];
  const speechFrames = scene.durationInFrames - PADDING_FRAMES;
  return [{ frame: Math.max(0, start - SCENE_SOUND_LEAD_FRAMES), sound: "mallet" as const },...revealSounds[i].map(([share, sound]) => ({ frame: start + Math.round(speechFrames * share), sound }))];
});

export const DevVsDevops: React.FC<DevVsDevopsProps> = ({ channelName }) => {
  useVietnameseFont();
  const frame = useCurrentFrame();

  let sceneIndex = 0;
  let sceneStart = 0;
  while (sceneIndex < lastIndex && frame >= sceneStart + sceneDurations[sceneIndex]) {
    sceneStart += sceneDurations[sceneIndex];
    sceneIndex += 1;
  }
  const localFrame = frame - sceneStart;

  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 0% 30%,#123f46 0%,transparent 55%),radial-gradient(ellipse at 100% 70%,#4a3417 0%,transparent 55%),#070e19", color: "#f3f7ff", fontFamily: vietnameseFontFamily, whiteSpace: "pre-line" }}>
      <SfxTrack cues={sfxCues} />
      <BrandHeader channelName={channelName} />
      {/* Scene 1 already shows both names in its cards. */}
      {sceneIndex > 0 ? <VersusBar opacityA={sideOpacity(sceneIndex, localFrame, "a")} opacityB={sideOpacity(sceneIndex, localFrame, "b")} /> : null}
      <Series>
        {audioManifest.scenes.map((scene, i) => {
          const props: SceneProps = { text: scene.text, audioPath: scene.audioPath, duration: sceneDurations[i], speechFrames: scene.durationInFrames - PADDING_FRAMES };
          const Scene = sceneComponents[i];
          return (
            <Series.Sequence key={scene.id} durationInFrames={sceneDurations[i]}>
              {i === lastIndex ? <Scene6Verdict {...props} channelName={channelName} /> : <Scene {...props} />}
            </Series.Sequence>
          );
        })}
      </Series>
      <div style={{ position: "absolute", left: 88, right: 88, bottom: 190, height: 5, background: "#ffffff16" }}>
        <div style={{ width: `${(frame / devVsDevopsDuration) * 100}%`, height: "100%", background: "#f3f7ff" }} />
      </div>
    </AbsoluteFill>
  );
};
