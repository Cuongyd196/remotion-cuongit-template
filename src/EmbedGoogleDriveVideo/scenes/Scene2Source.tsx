import React from "react";
import { Img, staticFile } from "remotion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";

const SCENE = 1;
// source.png is 1200x2100, so at 904px wide it is 1582px tall. The crop stops above the excerpt paragraph.
const IMAGE_HEIGHT = Math.round((904 * 2100) / 1200);
const CROP_HEIGHT = 290;

export const Scene2Source: React.FC<SceneProps> = (props) => {
  const delay = (item: number) => revealDelay(SCENE, item, props.speechFrames);
  return (
    <SceneShell {...props} index={SCENE} label="NGUỒN">
      <Reveal delay={delay(0)}>
        <div style={{ width: 904, height: CROP_HEIGHT, overflow: "hidden", borderRadius: 24 }}>
          <Img src={staticFile("content/EmbedGoogleDriveVideo/source.png")} style={{ width: 904, height: IMAGE_HEIGHT, maxWidth: "none" }} />
        </div>
      </Reveal>
      <Reveal delay={delay(1)} style={{ fontSize: 32, color: "#b8c6d9", whiteSpace: "nowrap" }}>Blog Cường IT · đăng ngày 30/09/2025</Reveal>
      <Reveal delay={delay(2)} style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.35 }}>{"Google Drive không chỉ lưu trữ,\ncòn phát video trực tuyến"}</Reveal>
      <Reveal delay={delay(3)} style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {["WordPress", "Moodle", "Blogger", "HTML thuần"].map((name) => (
          <div key={name} style={{ fontSize: 32, fontWeight: 700, padding: "12px 24px", borderRadius: 999, border: "2px solid #54f0ca80", color: "#54f0ca", whiteSpace: "nowrap" }}>{name}</div>
        ))}
      </Reveal>
    </SceneShell>
  );
};
