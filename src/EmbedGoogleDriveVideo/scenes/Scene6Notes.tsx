import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";

const SCENE = 5;
const notes = [
  { title: "Quyền truy cập", body: "Công khai hoặc Anyone with the link" },
  { title: "Giới hạn băng thông", body: "Theo Cường IT: nhiều người xem cùng lúc,\nvideo có thể bị chặn tạm thời" },
  { title: "Website bật CSP", body: "Cho phép domain drive.google.com" },
];

export const Scene6Notes: React.FC<SceneProps> = (props) => {
  const delay = (item: number) => revealDelay(SCENE, item, props.speechFrames);
  return (
    <SceneShell {...props} index={SCENE} label="LƯU Ý">
      {notes.map((note, i) => (
        <Reveal key={note.title} delay={delay(i)} style={{ padding: "32px 30px", borderRadius: 24, background: "#ffffff0d", borderLeft: "8px solid #ffc857" }}>
          <div style={{ fontSize: 44, fontWeight: 800, color: "#ffc857", marginBottom: 14 }}>{note.title}</div>
          <div style={{ fontSize: 36, lineHeight: 1.4 }}>{note.body}</div>
        </Reveal>
      ))}
    </SceneShell>
  );
};
