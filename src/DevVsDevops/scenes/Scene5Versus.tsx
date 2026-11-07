import React from "react";
import { useCurrentFrame } from "remotion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { sideOpacity } from "../sideCues";
import { colorA, colorB, muted } from "../theme";

const criteria = [
  { name: "TRỌNG TÂM", a: "Tạo ra\nphần mềm", b: "Phát hành,\nvận hành", share: 0 },
  { name: "VIỆC CHÍNH", a: "Thiết kế,\nviết code", b: "Hạ tầng,\ntự động hóa", share: 0.3 },
  { name: "KỸ NĂNG", a: "Lập trình,\nkiểm thử", b: "Code và\nvận hành", share: 0.64 },
];

const Value: React.FC<{ text: string; color: string; opacity: number }> = ({ text, color, opacity }) => (
  <div style={{ flex: 1, minHeight: 130, opacity, borderRadius: 22, border: `2px solid ${color}70`, background: `${color}10`, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "16px 18px", fontSize: 40, fontWeight: 800, lineHeight: 1.2 }}>{text}</div>
);

export const Scene5Versus: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  return (
    <SceneShell {...props}>
      {criteria.map((item) => (
        <Reveal key={item.name} delay={Math.round(props.speechFrames * item.share) + 4}>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 3, color: muted, textAlign: "center", marginBottom: 14 }}>{item.name}</div>
          <div style={{ display: "flex", gap: 20 }}>
            <Value text={item.a} color={colorA} opacity={sideOpacity(4, frame, "a")} />
            <Value text={item.b} color={colorB} opacity={sideOpacity(4, frame, "b")} />
          </div>
        </Reveal>
      ))}
    </SceneShell>
  );
};
