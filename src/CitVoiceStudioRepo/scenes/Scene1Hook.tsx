import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { SceneProps, SceneShell } from "../components/SceneShell";
import { monoFont, muted, teal } from "../theme";

export const Scene1Hook: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  return (
    <SceneShell {...props} index={0} label="GITHUB REPO · TEXT TO SPEECH" animateIn={false}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Img src={staticFile("repos/CitVoiceStudioRepo/owner.png")} style={{ width: 96, height: 96, borderRadius: 48, border: `3px solid ${teal}` }} />
        <div style={{ fontFamily: monoFont, fontSize: 34, color: muted }}>Cuongyd196/cit-voice-studio</div>
      </div>
      <div style={{ fontSize: 104, lineHeight: 1.05, fontWeight: 900, whiteSpace: "nowrap" }}>CIT Voice Studio</div>
      <div style={{ fontSize: 48, lineHeight: 1.3, fontWeight: 700 }}>Văn bản tiếng Việt thành giọng nói, <span style={{ color: teal }}>ngay trên máy bạn</span></div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, height: 130 }}>
        {Array.from({ length: 26 }, (_, i) => {
          const h = 24 + Math.abs(Math.sin(frame / 5 + i * 0.7) * Math.cos(i * 0.4)) * 100;
          return <div key={i} style={{ flex: 1, height: h, borderRadius: 8, background: teal, opacity: 0.85 }} />;
        })}
      </div>
      <div style={{ fontSize: 30, color: muted }}>Giọng đọc tạo bằng AI, từ chính ứng dụng này</div>
    </SceneShell>
  );
};
