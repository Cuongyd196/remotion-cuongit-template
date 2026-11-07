import React from "react";
import { muted } from "../theme";
import { Reveal, SceneProps, SceneShell } from "./SceneShell";

// Both sides use this layout so neither one looks favoured.
export const SideProfile: React.FC<SceneProps & { color: string; definition: string; mainWork: string; challenge: string }> = ({ color, definition, mainWork, challenge, ...props }) => (
  <SceneShell {...props}>
    <div style={{ fontSize: 56, lineHeight: 1.2, fontWeight: 900 }}>{definition}</div>
    {[
      { label: "VIỆC CHÍNH", value: mainWork, share: 0.38, labelColor: color },
      { label: "THÁCH THỨC", value: challenge, share: 0.66, labelColor: muted },
    ].map((item) => (
      <Reveal key={item.label} delay={Math.round(props.speechFrames * item.share)} style={{ borderRadius: 28, border: `2px solid ${color}70`, background: "linear-gradient(115deg,#ffffff0c,#ffffff03)", padding: "30px 34px" }}>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 2, color: item.labelColor }}>{item.label}</div>
        <div style={{ fontSize: 44, fontWeight: 800, marginTop: 10, lineHeight: 1.25 }}>{item.value}</div>
      </Reveal>
    ))}
  </SceneShell>
);
