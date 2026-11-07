import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { monoFont, muted, teal } from "../theme";

const uses = ["Video", "Podcast", "Gọi API"];

export const Scene7Outro: React.FC<SceneProps & { channelName: string }> = ({ channelName, ...props }) => (
  <SceneShell {...props} index={6} label="NÊN DÙNG KHI NÀO">
    <div style={{ display: "flex", gap: 18 }}>
      {uses.map((use, i) => (
        <Reveal key={use} delay={6 + i * 8} style={{ flex: 1, textAlign: "center", border: `2px solid ${teal}70`, borderRadius: 24, padding: "30px 8px", fontSize: 42, fontWeight: 900 }}>{use}</Reveal>
      ))}
    </div>
    <Reveal delay={50} style={{ border: "2px solid #ffc86b80", borderRadius: 28, padding: "28px 32px", background: "#ffc86b10" }}>
      <div style={{ fontSize: 28, color: "#ffc86b", fontWeight: 800, marginBottom: 10 }}>LƯU Ý</div>
      <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.3 }}>Chỉ nhân bản giọng của bạn hoặc giọng đã được cho phép</div>
    </Reveal>
    <Reveal delay={110} style={{ marginTop: 16 }}>
      <div style={{ fontSize: 30, color: muted, marginBottom: 12 }}>Tải tại</div>
      <div style={{ fontFamily: monoFont, fontSize: 38, fontWeight: 700, color: teal, whiteSpace: "nowrap" }}>github.com/Cuongyd196/cit-voice-studio</div>
    </Reveal>
    <Reveal delay={160} style={{ color: teal, fontWeight: 900, fontSize: 40, marginTop: 12 }}>THEO DÕI {channelName} →</Reveal>
  </SceneShell>
);
