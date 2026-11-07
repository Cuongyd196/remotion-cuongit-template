import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";

const SCENE = 6;

export const Scene7Outro: React.FC<SceneProps> = (props) => {
  const delay = (item: number) => revealDelay(SCENE, item, props.speechFrames);
  return (
    <SceneShell {...props} index={SCENE} label="WEBSITE ĐÔNG KHÁCH">
      <Reveal delay={delay(0)} style={{ fontSize: 76, fontWeight: 900, lineHeight: 1.2 }}>{"Lượng truy cập lớn?\nCân nhắc dùng:"}</Reveal>
      <Reveal delay={delay(1)} style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {["YouTube", "Vimeo", "Cloudflare Stream"].map((name) => (
          <div key={name} style={{ fontSize: 38, fontWeight: 700, padding: "14px 28px", borderRadius: 999, border: "2px solid #54f0ca80", color: "#54f0ca", whiteSpace: "nowrap" }}>{name}</div>
        ))}
      </Reveal>
      <Reveal delay={delay(2)} style={{ marginTop: 24 }}>
        <div style={{ fontSize: 40, fontWeight: 800 }}>Nguồn: blog Cường IT</div>
        <div style={{ fontSize: 32, color: "#b8c6d9", whiteSpace: "nowrap", marginTop: 8 }}>cuongit.net/blog · đăng ngày 30/09/2025</div>
      </Reveal>
      <Reveal delay={delay(3)} style={{ fontSize: 44, fontWeight: 800, color: "#ffc857" }}>Theo dõi kênh để xem thêm</Reveal>
    </SceneShell>
  );
};
