import { interpolate } from "remotion";
import { audioManifest } from "./audioData";
import { Side } from "./theme";

const PADDING_FRAMES = 10;
const SWITCH_FRAMES = 8;
const DIMMED = 0.35;

// For each scene: the words where the voice starts talking about a side, in spoken order.
const sceneCues: [string, Side][][] = [
  [["Mới vào nghề", "both"]],
  [["Khác biệt", "both"], ["Dev tập trung", "a"], ["DevOps tập trung", "b"]],
  [["Dev là người", "a"]],
  [["DevOps vốn", "b"]],
  [
    ["Về trọng tâm", "both"], ["Dev tạo ra", "a"], ["DevOps lo", "b"],
    ["Về việc chính", "both"], ["Dev thiết kế", "a"], ["DevOps làm", "b"],
    ["Về kỹ năng", "both"], ["Dev cần", "a"], ["DevOps cần", "b"],
  ],
  [["Chọn Dev", "a"], ["Chọn DevOps", "b"], ["Theo dõi", "both"]],
];

// Speech time is estimated from character position, the same way captions are timed.
const timedCues = sceneCues.map((cues, sceneIndex) => {
  const { text, durationInFrames } = audioManifest.scenes[sceneIndex];
  const speechFrames = durationInFrames - PADDING_FRAMES;
  let cursor = 0;
  return cues.map(([phrase, side]) => {
    const at = text.indexOf(phrase, cursor);
    if (at === -1) throw new Error(`Cue "${phrase}" not found in scene ${sceneIndex + 1}`);
    cursor = at + phrase.length;
    return { frame: Math.round((at / text.length) * speechFrames), side };
  });
});

const opacityFor = (side: Side, own: "a" | "b") => (side === "both" || side === own ? 1 : DIMMED);

/** How bright one side should be at a frame local to the scene. */
export const sideOpacity = (sceneIndex: number, localFrame: number, own: "a" | "b") => {
  const cues = timedCues[sceneIndex];
  let index = 0;
  for (let i = 0; i < cues.length; i++) {
    if (localFrame >= cues[i].frame) index = i;
  }
  const previousScene = timedCues[sceneIndex - 1];
  const previousSide = index > 0 ? cues[index - 1].side : (previousScene?.[previousScene.length - 1].side ?? cues[0].side);
  return interpolate(localFrame, [cues[index].frame, cues[index].frame + SWITCH_FRAMES], [opacityFor(previousSide, own), opacityFor(cues[index].side, own)], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
};
