import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { vietnameseFontFamily } from "../useVietnameseFont";

const SCENE = 3;
const mono = "Consolas, monospace";

export const Scene4Iframe: React.FC<SceneProps> = (props) => {
  const delay = (item: number) => revealDelay(SCENE, item, props.speechFrames);
  return (
    <SceneShell {...props} index={SCENE} label="CHÈN VÀO HTML">
      <Reveal delay={delay(0)} style={{ padding: "32px 30px", borderRadius: 24, background: "#040a12", border: "1px solid #ffffff22", fontFamily: mono, fontSize: 36, lineHeight: 1.5, whiteSpace: "pre" }}>
        <span style={{ color: "#8fb7ff" }}>{"<div"}</span>
        {' style="position:relative;\n  padding-top:56.25%;..."'}
        <span style={{ color: "#8fb7ff" }}>{">"}</span>
        <span style={{ color: "#8fb7ff" }}>{"\n  <iframe"}</span>
        {"\n    src="}
        <span style={{ color: "#54f0ca" }}>{'".../preview"'}</span>
        {"\n    allowfullscreen"}
        <span style={{ color: "#8fb7ff" }}>{">"}</span>
        <span style={{ color: "#8fb7ff" }}>{"\n  </iframe>\n</div>"}</span>
        <div style={{ fontFamily: vietnameseFontFamily, fontSize: 28, color: "#8294ab", whiteSpace: "nowrap", marginTop: 12 }}>Mã rút gọn, bản đầy đủ trong bài viết</div>
      </Reveal>
      <div style={{ display: "flex", gap: 24 }}>
        <Reveal delay={delay(1)} style={{ flex: 1, padding: "30px 28px", borderRadius: 24, background: "#ffffff0d", border: "1px solid #ffffff1a" }}>
          <div style={{ fontSize: 76, fontWeight: 900, lineHeight: "88px", color: "#54f0ca", whiteSpace: "nowrap" }}>16:9</div>
          <div style={{ fontSize: 32, color: "#b8c6d9" }}>Tỉ lệ hiển thị</div>
        </Reveal>
        <Reveal delay={delay(2)} style={{ flex: 1, padding: "30px 28px", borderRadius: 24, background: "#ffffff0d", border: "1px solid #ffffff1a" }}>
          <div style={{ fontSize: 52, fontWeight: 900, lineHeight: "88px", whiteSpace: "nowrap" }}>Responsive</div>
          <div style={{ fontSize: 32, color: "#b8c6d9" }}>Trên mọi màn hình</div>
        </Reveal>
      </div>
    </SceneShell>
  );
};
