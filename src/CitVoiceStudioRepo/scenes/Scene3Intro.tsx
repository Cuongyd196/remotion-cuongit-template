import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { blue, monoFont, muted, teal } from "../theme";

const facts = [
  ["Giá", "Miễn phí"],
  ["Hệ điều hành", "Windows · Linux · macOS"],
  ["Phát hành", "Dạng bộ cài"],
  ["Giấy phép (theo README)", "Apache 2.0"],
  ["Tác giả Cường IT", "Bộ cài tích hợp sẵn mô hình, dễ sử dụng"],
];

// repo.png is 1920x3600. Show only the README column, which leaves out the About sidebar and the still-loading file list.
const WINDOW_WIDTH = 904;
const WINDOW_HEIGHT = 540;
const COLUMN_LEFT = 47;
const COLUMN_WIDTH = 1357;
const SCALE = WINDOW_WIDTH / COLUMN_WIDTH;
const SCROLL_FROM = 940;
const SCROLL_TO = 1610;

export const Scene3Intro: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const scroll = interpolate(frame, [45, 200], [SCROLL_FROM, SCROLL_TO], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (
    <SceneShell {...props} index={2} label="REPO NÀY LÀ GÌ">
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <Img src={staticFile("repos/CitVoiceStudioRepo/owner.png")} style={{ width: 96, height: 96, borderRadius: 22 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: monoFont, fontSize: 28, color: muted }}>Cuongyd196/</div>
          <div style={{ fontFamily: monoFont, fontSize: 40, fontWeight: 700 }}>cit-voice-studio</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 56, fontWeight: 900, color: teal, lineHeight: 1.1 }}>★ 149</div>
          <div style={{ fontSize: 24, color: muted }}>sao, 07/11/2026</div>
        </div>
      </div>
      <Reveal delay={6} style={{ position: "relative", width: WINDOW_WIDTH, height: WINDOW_HEIGHT, overflow: "hidden", borderRadius: 24, border: `2px solid ${blue}80`, background: "#ffffff" }}>
        <Img src={staticFile("repos/CitVoiceStudioRepo/repo.png")} style={{ position: "absolute", maxWidth: "none", width: 1920 * SCALE, left: -COLUMN_LEFT * SCALE, top: -scroll * SCALE }} />
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 24px" }}>
        {facts.map(([name, value], i) => (
          <Reveal key={name} delay={24 + i * 10} style={{ borderLeft: `6px solid ${i % 2 ? blue : teal}`, paddingLeft: 20, gridColumn: i === facts.length - 1 ? "1 / -1" : undefined }}>
            <div style={{ fontSize: 26, color: muted }}>{name}</div>
            <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.25 }}>{value}</div>
          </Reveal>
        ))}
      </div>
    </SceneShell>
  );
};
