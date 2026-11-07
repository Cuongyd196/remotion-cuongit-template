import React from "react";
import { SceneProps, SceneShell } from "../components/SceneShell";

export const Scene1Hook: React.FC<SceneProps> = (props) => (
  <SceneShell {...props} index={0} label="HƯỚNG DẪN" animateIn={false}>
    <div style={{ fontSize: 104, fontWeight: 900, lineHeight: 1.15 }}>{"Nhúng video\nGoogle Drive\nvào website"}</div>
    <div style={{ fontSize: 44, fontWeight: 700, color: "#54f0ca" }}>Sửa link, dùng iframe, không cần plugin</div>
    <div style={{ fontSize: 32, color: "#b8c6d9", whiteSpace: "nowrap" }}>Nguồn: blog Cường IT · cuongit.net</div>
  </SceneShell>
);
