import { SfxName } from "../sfx/SfxTrack";

export const sceneReveals: [number, SfxName][][] = [
  [],
  [[0.05, "tick"], [0.22, "pop"], [0.45, "pop"], [0.66, "pop"]],
  [[0.05, "pop"], [0.2, "pop"], [0.36, "pop"], [0.6, "pop"], [0.72, "ding"]],
  [[0.05, "pop"], [0.6, "ding"], [0.8, "pop"]],
  [[0.12, "pop"], [0.55, "pop"], [0.84, "pop"]],
  [[0.05, "pop"], [0.3, "ding"], [0.78, "pop"]],
  [[0.05, "ding"], [0.33, "pop"], [0.6, "tick"], [0.84, "chime"]],
];

// sceneIndex and itemIndex both count from 0.
export const revealDelay = (sceneIndex: number, itemIndex: number, speechFrames: number) => Math.round(speechFrames * sceneReveals[sceneIndex][itemIndex][0]);
