import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { blue, monoFont, muted, teal } from "../theme";

const steps = ["Tải bộ cài đúng với máy", "Gõ văn bản, chèn thẻ", "Chọn giọng, tạo âm thanh"];

// Exact syntax examples from the repo README ("Cú pháp nhanh").
const CodeLine: React.FC<{ before: string; tag: string; after: string }> = ({ before, tag, after }) => (
  <div style={{ fontFamily: monoFont, fontSize: 38, lineHeight: 1.5, whiteSpace: "pre" }}>
    {before}<span style={{ color: teal, fontWeight: 700 }}>{tag}</span>{after}
  </div>
);

export const Scene4Usage: React.FC<SceneProps> = (props) => (
  <SceneShell {...props} index={3} label="CÁCH DÙNG">
    <div style={{ fontSize: 92, lineHeight: 1.1, fontWeight: 900 }}>Cài xong,{"\n"}dùng được ngay</div>
    {steps.map((step, i) => (
      <Reveal key={step} delay={10 + i * 12} style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ width: 70, height: 70, flexShrink: 0, borderRadius: 35, background: i % 2 ? blue : teal, color: "#070e19", fontSize: 38, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
        <div style={{ fontSize: 42, fontWeight: 800 }}>{step}</div>
      </Reveal>
    ))}
    <Reveal delay={60} style={{ borderRadius: 24, border: "2px solid #ffffff24", background: "#050a12", padding: "26px 32px", marginTop: 12 }}>
      <div style={{ fontSize: 28, color: muted, marginBottom: 14 }}>Viết trong văn bản</div>
      <CodeLine before="Tin vui " tag="[cười]" after=" cho cả nhà." />
      <CodeLine before="Phần một. " tag="[nghỉ 2s]" after=" Phần hai." />
    </Reveal>
  </SceneShell>
);
