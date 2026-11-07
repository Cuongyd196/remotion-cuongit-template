import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";

const SCENE = 2;
const steps = ["Tải video lên Google Drive", "Chuột phải, chọn Chia sẻ (Share)", "Quyền: Anyone with the link / Viewer", "Sao chép link chia sẻ"];
const mono = "Consolas, monospace";

export const Scene3Link: React.FC<SceneProps> = (props) => {
  const delay = (item: number) => revealDelay(SCENE, item, props.speechFrames);
  return (
    <SceneShell {...props} index={SCENE} label="TẠO LINK NHÚNG">
      {steps.map((step, i) => (
        <Reveal key={step} delay={delay(i)} style={{ display: "flex", alignItems: "center", gap: 24, padding: "22px 28px", borderRadius: 24, background: "#ffffff0d", border: "1px solid #ffffff1a" }}>
          <div style={{ width: 36, textAlign: "center", fontSize: 44, fontWeight: 900, color: "#54f0ca" }}>{i + 1}</div>
          <div style={{ fontSize: 38, fontWeight: 700, whiteSpace: "nowrap" }}>{step}</div>
        </Reveal>
      ))}
      <Reveal delay={delay(4)} style={{ padding: "30px 28px", borderRadius: 24, background: "#54f0ca18", border: "2px solid #54f0ca" }}>
        <div style={{ fontSize: 30, color: "#b8c6d9", marginBottom: 16 }}>Thay đoạn cuối của link</div>
        <div style={{ fontFamily: mono, fontSize: 46, fontWeight: 700, whiteSpace: "nowrap" }}>
          <span style={{ color: "#ff8f8f" }}>/view?...</span>
          <span style={{ color: "#8294ab" }}> → </span>
          <span style={{ color: "#54f0ca" }}>/preview</span>
        </div>
      </Reveal>
    </SceneShell>
  );
};
