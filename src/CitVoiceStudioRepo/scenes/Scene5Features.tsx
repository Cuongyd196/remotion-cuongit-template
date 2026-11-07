import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { blue, muted, teal } from "../theme";

const features = [
  ["25", "giọng tiếng Việt", "Nam, nữ, cả ba miền"],
  ["3–8s", "để nhân bản giọng", "Thu micro hoặc nhập file âm thanh"],
  [".srt", "lồng tiếng phụ đề", "Khớp đúng mốc thời gian"],
  ["31", "ngôn ngữ", "Tải thêm mô hình Supertonic 3"],
];

export const Scene5Features: React.FC<SceneProps> = (props) => (
  <SceneShell {...props} index={4} label="TÍNH NĂNG NỔI BẬT">
    <div style={{ fontSize: 76, lineHeight: 1.1, fontWeight: 900, marginBottom: 8 }}>Tiếng Việt và{"\n"}đa ngôn ngữ</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
      {features.map(([big, title, detail], i) => {
        const color = i === 1 || i === 2 ? blue : teal;
        return (
          <Reveal key={title} delay={6 + i * 45} style={{ border: `2px solid ${color}50`, borderRadius: 28, padding: "28px 26px", background: "linear-gradient(115deg,#ffffff0c,#ffffff03)" }}>
            <div style={{ fontSize: 88, lineHeight: 1.05, fontWeight: 900, color }}>{big}</div>
            <div style={{ fontSize: 36, fontWeight: 800, marginTop: 10, lineHeight: 1.2 }}>{title}</div>
            <div style={{ fontSize: 28, color: muted, marginTop: 8, lineHeight: 1.25 }}>{detail}</div>
          </Reveal>
        );
      })}
    </div>
  </SceneShell>
);
