import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { muted, teal } from "../theme";

const rows = [
  ["Phải tạo tài khoản", "Không cần tài khoản"],
  ["Gửi nội dung lên mạng", "Văn bản và giọng nói không rời máy"],
  ["Luôn phải có mạng", "Không cần Internet sau khi cài"],
];

export const Scene2Pain: React.FC<SceneProps> = (props) => (
  <SceneShell {...props} index={1} label="ĐIỀU BẠN NGẠI">
    <div style={{ fontSize: 82, lineHeight: 1.12, fontWeight: 900, marginBottom: 12 }}>Cần giọng đọc,{"\n"}ngại gửi lên mạng?</div>
    {rows.map(([before, after], i) => (
      <Reveal key={after} delay={12 + i * 14} style={{ border: `2px solid ${teal}50`, borderRadius: 28, padding: "28px 32px", background: "linear-gradient(115deg,#ffffff0c,#ffffff03)" }}>
        <div style={{ fontSize: 32, color: muted, textDecoration: "line-through", marginBottom: 10 }}>{before}</div>
        <div style={{ fontSize: 42, fontWeight: 900, color: teal, lineHeight: 1.25 }}>{after}</div>
      </Reveal>
    ))}
  </SceneShell>
);
