import React from "react";
import { useCurrentFrame } from "remotion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { sideOpacity } from "../sideCues";
import { colorA, colorB, muted, nameA, nameB } from "../theme";

const picks = [
  { side: "a" as const, name: nameA, color: colorA, when: "Thích viết code,\nxây tính năng", share: 0.02 },
  { side: "b" as const, name: nameB, color: colorB, when: "Thích hạ tầng, tự động hóa,\ngiữ hệ thống ổn định", share: 0.3 },
];

export const Scene6Verdict: React.FC<SceneProps & { channelName: string }> = ({ channelName, ...props }) => {
  const frame = useCurrentFrame();
  return (
    <SceneShell {...props}>
      {picks.map((pick) => (
        <div key={pick.name} style={{ opacity: sideOpacity(5, frame, pick.side) }}>
          <Reveal delay={Math.round(props.speechFrames * pick.share)} style={{ borderRadius: 28, border: `3px solid ${pick.color}`, background: `${pick.color}10`, padding: "32px 34px" }}>
            <div style={{ fontSize: 34, fontWeight: 800, color: muted }}>CHỌN</div>
            <div style={{ fontSize: 72, fontWeight: 900, color: pick.color, whiteSpace: "nowrap" }}>{pick.name} khi</div>
            <div style={{ fontSize: 42, fontWeight: 800, marginTop: 10, lineHeight: 1.28 }}>{pick.when}</div>
          </Reveal>
        </div>
      ))}
      <Reveal delay={Math.round(props.speechFrames * 0.72)} style={{ textAlign: "center", fontWeight: 900, fontSize: 40, marginTop: 10 }}>THEO DÕI {channelName} →</Reveal>
    </SceneShell>
  );
};
