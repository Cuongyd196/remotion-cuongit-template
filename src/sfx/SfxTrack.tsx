import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

// Sound groups, volumes and the two guards below follow the approach of
// github.com/hoquanghai/Auto-Create-Video (MIT). The sounds themselves are
// original, made by scripts/generate-sfx.ts.
export const SFX = {
  mallet: { src: "sfx/transition/mallet.wav", volume: 0.4 },
  pop: { src: "sfx/transition/pop.wav", volume: 0.35 },
  tick: { src: "sfx/emphasis/tick.wav", volume: 0.3 },
  ding: { src: "sfx/emphasis/ding.wav", volume: 0.35 },
  chime: { src: "sfx/outro/chime.wav", volume: 0.4 },
} as const;

export type SfxName = keyof typeof SFX;
export type SfxCue = { frame: number; sound: SfxName };

const FPS = 30;
const MIN_GAP_FRAMES = Math.round(0.4 * FPS);
const REPEAT_VOLUME = 0.65;
const LONGEST_SOUND_FRAMES = 36;

/**
 * Turns wanted cues into the ones that actually play. Earlier cues win:
 * a cue too close to the previous sound is dropped so the two never clash,
 * and a sound repeated right after itself plays quieter so it does not grate.
 */
export const planSfx = (cues: SfxCue[]) => {
  const planned: (SfxCue & { volume: number })[] = [];
  for (const cue of [...cues].sort((a, b) => a.frame - b.frame)) {
    const last = planned[planned.length - 1];
    if (last && cue.frame - last.frame < MIN_GAP_FRAMES) continue;
    const repeated = last?.sound === cue.sound;
    planned.push({ ...cue, volume: SFX[cue.sound].volume * (repeated ? REPEAT_VOLUME : 1) });
  }
  return planned;
};

export const SfxTrack: React.FC<{ cues: SfxCue[] }> = ({ cues }) => (
  <>
    {planSfx(cues).map((cue) => (
      <Sequence key={`${cue.frame}-${cue.sound}`} from={cue.frame} durationInFrames={LONGEST_SOUND_FRAMES}>
        <Audio src={staticFile(SFX[cue.sound].src)} volume={() => cue.volume} />
      </Sequence>
    ))}
  </>
);
