import React from "react";
import { SceneProps, SceneShell } from "../components/SceneShell";
import { colorA, colorB, muted, nameA, nameB } from "../theme";

const Card: React.FC<{ name: string; detail: string; color: string }> = ({ name, detail, color }) => (
  <div style={{ flex: 1, height: 360, borderRadius: 32, border: `3px solid ${color}`, background: `${color}14`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, padding: 20 }}>
    <div style={{ fontSize: 68, fontWeight: 900, color, whiteSpace: "nowrap" }}>{name}</div>
    <div style={{ fontSize: 32, fontWeight: 700, textAlign: "center", lineHeight: 1.3 }}>{detail}</div>
  </div>
);

export const Scene1Hook: React.FC<SceneProps> = (props) => (
  <SceneShell {...props} animateIn={false} top={260}>
    <div style={{ position: "relative", display: "flex", gap: 24 }}>
      <Card name={nameA} detail={"Tạo ra\nphần mềm"} color={colorA} />
      <Card name={nameB} detail={"Đưa phần mềm\nlên chạy ổn định"} color={colorB} />
      <div style={{ position: "absolute", top: 130, left: "50%", transform: "translateX(-50%)", width: 100, height: 100, borderRadius: 50, background: "#070e19", border: "3px solid #ffffff60", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 900 }}>VS</div>
    </div>
    <div style={{ fontSize: 84, lineHeight: 1.15, fontWeight: 900, marginTop: 20 }}>Mới vào nghề,{"\n"}chọn hướng nào?</div>
    <div style={{ fontSize: 34, color: muted }}>Không đối đầu, mà cùng làm việc</div>
  </SceneShell>
);
