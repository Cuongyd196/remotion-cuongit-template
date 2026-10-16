import React from "react";
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const teal = "#54f0ca";
const blue = "#8aaaff";
const data = [
  { label: "HAI KHÁI NIỆM · MỘT HỆ SINH THÁI", title: "DevOps\n& Sysadmin", note: "Cùng hạ tầng. Khác trọng tâm.", cards: [["SYSADMIN", "Quản trị hệ thống"], ["DEVOPS", "Kết nối phát triển & vận hành"]] },
  { label: "BÀI TOÁN PHỐI HỢP", title: "Code chạy tốt.\nHệ thống thì sao?", note: "Cần một vòng phản hồi chung", cards: [["PHÁT TRIỂN", "Đưa tính năng đến người dùng"], ["VẬN HÀNH", "Giữ dịch vụ ổn định, an toàn"]] },
  { label: "VAI TRÒ QUẢN TRỊ", title: "Sysadmin", note: "Hạ tầng an toàn · Dịch vụ sẵn sàng", cards: [["01  MÁY CHỦ", "Cấu hình · Tài khoản · Phân quyền"], ["02  BẢO MẬT", "Cập nhật · Kiểm soát truy cập"], ["03  DỮ LIỆU", "Sao lưu · Khôi phục"]] },
  { label: "VĂN HÓA & CÁCH LÀM", title: "DevOps", note: "Chia sẻ trách nhiệm · Phản hồi liên tục", cards: [["01  PHỐI HỢP", "Phát triển ↔ Vận hành"], ["02  TỰ ĐỘNG HÓA", "Kiểm thử · Triển khai · Hạ tầng"], ["03  CẢI TIẾN", "Thay đổi nhỏ · Đo lường thường xuyên"]] },
  { label: "MỘT LẦN PHÁT HÀNH", title: "Từ code\nđến vận hành", note: "Sysadmin có thể tham gia toàn bộ luồng", cards: [["CODE → TEST", "Kiểm thử tự động"], ["DEPLOY → MONITOR", "Triển khai rồi giám sát"], ["PHẢN HỒI → CẢI TIẾN", "Có lỗi: khôi phục, tìm nguyên nhân"]] },
  { label: "GHI NHỚ", title: "Khác trọng tâm.\nCó giao nhau.", note: "Phạm vi công việc tùy từng tổ chức", cards: [["SYSADMIN", "Tập trung quản trị hệ thống"], ["DEVOPS", "Cải thiện dòng chảy phần mềm"]] },
];

const Panel: React.FC<{ title: string; detail: string; index: number; active?: boolean }> = ({ title, detail, index, active = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - 12 - index * 9, fps, config: { damping: 18, stiffness: 120 } });
  const color = index % 2 ? blue : teal;
  return <div style={{ transform: `translateY(${(1-p)*45}px)`, opacity: p * (active ? 1 : 0.32), border: `2px solid ${color}50`, borderRadius: 28, padding: "30px 32px", background: "linear-gradient(115deg,#ffffff0c,#ffffff03)", boxShadow: "0 18px 55px #00000020" }}><div style={{ fontSize: 39, fontWeight: 900, color, marginBottom: 12 }}>{title}</div><div style={{ fontSize: 31, color: "#d7e1f0", lineHeight: 1.35 }}>{detail}</div></div>;
};

export const ExplainerScene: React.FC<{ index: number; text: string; audioPath: string; duration: number }> = ({ index, text, audioPath, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scene = data[index];
  const enter = spring({ frame, fps, config: { damping: 20 } });
  const opacity = interpolate(frame, [duration-6, duration], [1,0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const words = text.split(/\s+/);
  const captions = Array.from({ length: Math.ceil(words.length/6) }, (_, i) => words.slice(i*6,i*6+6).join(" "));
  const speechFrames = duration - 3 - (index === 5 ? 40 : 0);
  const captionIndex = Math.min(captions.length-1,Math.floor(frame/Math.max(1,speechFrames)*captions.length));
  const activeStep = Math.min(2, Math.floor(frame/(duration/3)));
  return <AbsoluteFill style={{ opacity }}>
    <Audio src={staticFile(audioPath)} playbackRate={1} />
    <div style={{ position: "absolute", left: 88, right: 88, top: 350, height: 1060, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26, opacity: enter, transform: `translateY(${(1-enter)*30}px)` }}>
      <div style={{ fontSize: 26, letterSpacing: 3, color: teal, fontWeight: 800 }}>{scene.label}</div>
      <div style={{ fontSize: index === 2 || index === 3 ? 104 : 78, lineHeight: 1.12, fontWeight: 900, whiteSpace: "pre-line", marginBottom: 18 }}>{scene.title}</div>
      {index === 0 && <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>{Array.from({ length: 12 }, (_, i) => <div key={i} style={{ flex: 1, height: 8, borderRadius: 5, background: i < (Math.floor(frame/7)%13) ? teal : "#ffffff18" }} />)}</div>}
      {scene.cards.map(([title,detail],i) => <Panel key={title} title={title} detail={detail} index={i} active={index !== 4 || i <= activeStep} />)}
      <div style={{ fontSize: 31, lineHeight: 1.4, color: "#aabbd0", marginTop: 16 }}>{scene.note}</div>
      {index === 5 && <div style={{ color: teal, fontWeight: 900, fontSize: 33, marginTop: 20 }}>THEO DÕI CƯỜNG IT →</div>}
    </div>
    <div style={{ position: "absolute", top: 1520, left: 45, right: 45, textAlign: "center" }}><div style={{ display: "inline-block", whiteSpace: "nowrap", fontSize: 37, fontWeight: 800, padding: "23px 29px", border: "2px solid #54f0ca60", background: "#091925", borderRadius: 60 }}>{captions[captionIndex]}</div></div>
    <div style={{ position: "absolute", bottom: 215, right: 90, fontSize: 24, color: "#8294ab", letterSpacing: 4 }}>0{index+1} / 06</div>
  </AbsoluteFill>;
};
