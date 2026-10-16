import React from "react";
import { AbsoluteFill, Series, useCurrentFrame } from "remotion";
import { audioManifest } from "./audioData";
import { DevOpsSysadminProps } from "./types";
import { ExplainerScene } from "./scenes/ExplainerScene";
import { useVietnameseFont, vietnameseFontFamily } from "./useVietnameseFont";

// Audio manifest includes ten padding frames; retain only three after speech.
export const sceneDurations = audioManifest.scenes.map((scene, index) => scene.durationInFrames - 10 + 3 + (index === 5 ? 40 : 0));
export const devOpsSysadminDuration = sceneDurations.reduce((sum, frames) => sum + frames, 0);
export const DevOpsSysadmin: React.FC<DevOpsSysadminProps> = ({ channelName }) => {
  useVietnameseFont();
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ background: "radial-gradient(ellipse at 0% 30%,#123f46 0%,transparent 55%),radial-gradient(ellipse at 100% 75%,#1d284b 0%,transparent 55%),#070e19", color: "#f3f7ff", fontFamily: vietnameseFontFamily }}>
    <AbsoluteFill style={{ backgroundImage: "linear-gradient(#83b6ca0b 1px,transparent 1px),linear-gradient(90deg,#83b6ca0b 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
    <div style={{ position: "absolute", top: 150, left: "50%", transform: "translateX(-50%)", border: "2px solid #54f0ca60", borderRadius: 50, padding: "17px 30px", fontSize: 30, fontWeight: 900, letterSpacing: 4 }}>⚡ {channelName}</div>
    <Series>{audioManifest.scenes.map((scene, index) => <Series.Sequence key={scene.id} durationInFrames={sceneDurations[index]}><ExplainerScene index={index} text={scene.text} audioPath={scene.audioPath} duration={sceneDurations[index]} /></Series.Sequence>)}</Series>
    <div style={{ position: "absolute", left: 88, right: 88, bottom: 190, height: 5, background: "#ffffff16" }}><div style={{ width: `${frame/devOpsSysadminDuration*100}%`, height: "100%", background: "#54f0ca" }} /></div>
  </AbsoluteFill>;
};
