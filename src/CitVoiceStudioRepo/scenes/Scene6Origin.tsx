import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { blue, muted, teal } from "../theme";

const models = [
  { name: "VieNeu-TTS", author: "Phạm Nguyễn Ngọc Bảo", detail: "Giọng Việt và nhân bản giọng. Kèm trong bộ cài.", color: teal },
  { name: "Supertonic 3", author: "Supertone Inc.", detail: "Giọng nước ngoài, 31 ngôn ngữ. Chỉ tải khi bạn chọn.", color: blue },
];

export const Scene6Origin: React.FC<SceneProps> = (props) => (
  <SceneShell {...props} index={5} label="NGUỒN GỐC MÔ HÌNH">
    <div style={{ fontSize: 76, lineHeight: 1.1, fontWeight: 900, marginBottom: 8 }}>Mô hình đến từ đâu?</div>
    {models.map((model, i) => (
      <Reveal key={model.name} delay={10 + i * 75} style={{ border: `2px solid ${model.color}50`, borderRadius: 28, padding: "30px 34px", background: "linear-gradient(115deg,#ffffff0c,#ffffff03)" }}>
        <div style={{ fontSize: 58, fontWeight: 900, color: model.color }}>{model.name}</div>
        <div style={{ fontSize: 36, fontWeight: 800, marginTop: 6 }}>{model.author}</div>
        <div style={{ fontSize: 31, color: muted, marginTop: 10, lineHeight: 1.3 }}>{model.detail}</div>
      </Reveal>
    ))}
    <div style={{ fontSize: 31, color: muted, lineHeight: 1.35 }}>Cường IT làm giao diện, một số tính năng và bộ cài.</div>
  </SceneShell>
);
