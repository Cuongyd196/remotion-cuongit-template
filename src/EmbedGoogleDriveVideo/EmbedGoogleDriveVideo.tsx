import React from "react";
import { AbsoluteFill, Series, useCurrentFrame } from "remotion";
import { SfxCue, SfxTrack } from "../sfx/SfxTrack";
import { audioManifest } from "./audioData";
import { sceneCaptions } from "./captions";
import { BrandHeader } from "./components/BrandHeader";
import { SceneProps } from "./components/SceneShell";
import { sceneReveals } from "./reveals";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Source } from "./scenes/Scene2Source";
import { Scene3Link } from "./scenes/Scene3Link";
import { Scene4Iframe } from "./scenes/Scene4Iframe";
import { Scene5Options } from "./scenes/Scene5Options";
import { Scene6Notes } from "./scenes/Scene6Notes";
import { Scene7Outro } from "./scenes/Scene7Outro";
import { useVietnameseFont, vietnameseFontFamily } from "./useVietnameseFont";

// The manifest adds 10 padding frames per scene; keep 3 after speech for a snappy cut.
const PADDING_FRAMES = 10;
const BUFFER_FRAMES = 3;
const OUTRO_HOLD_FRAMES = 40;
const SCENE_SOUND_LEAD_FRAMES = 3;
const lastIndex = audioManifest.scenes.length - 1;

const sceneDurations = audioManifest.scenes.map((scene, i) => scene.durationInFrames - PADDING_FRAMES + BUFFER_FRAMES + (i === lastIndex ? OUTRO_HOLD_FRAMES : 0));
export const embedGoogleDriveVideoDuration = sceneDurations.reduce((sum: number, frames) => sum + frames, 0);

const sceneComponents: React.FC<SceneProps>[] = [Scene1Hook, Scene2Source, Scene3Link, Scene4Iframe, Scene5Options, Scene6Notes, Scene7Outro];

let sceneStart = 0;
const sfxCues: SfxCue[] = audioManifest.scenes.flatMap((scene, i) => {
  const start = sceneStart;
  sceneStart += sceneDurations[i];
  const speechFrames = scene.durationInFrames - PADDING_FRAMES;
  return [{ frame: Math.max(0, start - SCENE_SOUND_LEAD_FRAMES), sound: "mallet" as const }, ...sceneReveals[i].map(([share, sound]) => ({ frame: start + Math.round(speechFrames * share), sound }))];
});

export const EmbedGoogleDriveVideo: React.FC<{ channelName: string }> = ({ channelName }) => {
  useVietnameseFont();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 0% 30%,#123f46 0%,transparent 55%),radial-gradient(ellipse at 100% 75%,#1d284b 0%,transparent 55%),#070e19", color: "#f3f7ff", fontFamily: vietnameseFontFamily, whiteSpace: "pre-line" }}>
      <SfxTrack cues={sfxCues} />
      <BrandHeader channelName={channelName} />
      <Series>
        {audioManifest.scenes.map((scene, i) => {
          const Scene = sceneComponents[i];
          return (
            <Series.Sequence key={scene.id} durationInFrames={sceneDurations[i]}>
              <Scene caption={sceneCaptions[i]} audioPath={scene.audioPath} duration={sceneDurations[i]} speechFrames={scene.durationInFrames - PADDING_FRAMES} />
            </Series.Sequence>
          );
        })}
      </Series>
      <div style={{ position: "absolute", left: 88, right: 88, bottom: 190, height: 5, background: "#ffffff16" }}>
        <div style={{ width: `${(frame / embedGoogleDriveVideoDuration) * 100}%`, height: "100%", background: "#54f0ca" }} />
      </div>
    </AbsoluteFill>
  );
};
