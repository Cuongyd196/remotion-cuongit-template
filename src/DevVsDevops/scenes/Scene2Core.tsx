import React from "react";
import { useCurrentFrame } from "remotion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { sideOpacity } from "../sideCues";
import { colorA, colorB, muted, nameA, nameB } from "../theme";

const rows = [
  { side: "a" as const, name: nameA, color: colorA, core: "Tạo ra phần mềm", detail: "Thiết kế, viết và kiểm thử", delayShare: 0.2 },
  { side: "b" as const, name: nameB, color: colorB, core: "Chạy nhanh, ổn định", detail: "Phát hành, hạ tầng, tự động hóa", delayShare: 0.45 },
];

export const Scene2Core: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  return (
    <SceneShell {...props}>
      <div style={{ fontSize: 76, lineHeight: 1.12, fontWeight: 900 }}>Khác biệt{"\n"}lớn nhất</div>
      {rows.map((row) => (
        <div key={row.name} style={{ opacity: sideOpacity(1, frame, row.side) }}>
          <Reveal delay={Math.round(props.speechFrames * row.delayShare)} style={{ borderRadius: 28, border: `2px solid ${row.color}70`, background: "linear-gradient(115deg,#ffffff0c,#ffffff03)", padding: "32px 34px" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: row.color }}>{row.name} tập trung</div>
            <div style={{ fontSize: 62, fontWeight: 900, marginTop: 6, whiteSpace: "nowrap" }}>{row.core}</div>
            <div style={{ fontSize: 34, color: muted, marginTop: 10, lineHeight: 1.3 }}>{row.detail}</div>
          </Reveal>
        </div>
      ))}
    </SceneShell>
  );
};
