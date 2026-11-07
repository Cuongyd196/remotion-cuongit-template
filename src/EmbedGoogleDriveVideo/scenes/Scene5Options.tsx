import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";

const SCENE = 4;
const mono = "Consolas, monospace";
const options = [
  { title: "Tự động phát", code: ".../preview?autoplay=1&mute=1" },
  { title: "Phát từ giây 60", code: ".../preview?start=60" },
  { title: "Kích thước cố định", code: 'width="640" height="360"' },
];

export const Scene5Options: React.FC<SceneProps> = (props) => {
  const delay = (item: number) => revealDelay(SCENE, item, props.speechFrames);
  return (
    <SceneShell {...props} index={SCENE} label="TÙY CHỈNH NÂNG CAO">
      {options.map((option, i) => (
        <Reveal key={option.title} delay={delay(i)} style={{ padding: "32px 30px", borderRadius: 24, background: "#ffffff0d", border: "1px solid #ffffff1a" }}>
          <div style={{ fontSize: 44, fontWeight: 800, marginBottom: 16 }}>{option.title}</div>
          <div style={{ fontFamily: mono, fontSize: 40, color: "#54f0ca", whiteSpace: "nowrap" }}>{option.code}</div>
        </Reveal>
      ))}
    </SceneShell>
  );
};
