---
name: remotion-topic-explainer
description: Tạo video ngắn 50-60s dạng video dọc (9:16, 1080x1920 @ 30fps) giải thích bất kỳ chủ đề lập trình/công nghệ nào bằng Remotion. Kết hợp giọng đọc AI Voiceover tự nhiên từ edge-tts-universal hoặc CIT Voice Studio (chọn qua TTS_PROVIDER trong .env), căn giữa nội dung trực quan, huy hiệu thương hiệu kênh phía trên và phụ đề 1 dòng gãy gọn.
---

# Remotion Topic Explainer Skill for Claude (50-60s Explainer Videos)

Kỹ năng này giúp Claude tự động tạo các video ngắn 50–60 giây (tỷ lệ dọc 9:16, chuẩn 1080x1920 @ 30fps cho TikTok, YouTube Shorts, Facebook Reels) từ bất kỳ chủ đề lập trình hay công nghệ nào bằng **Remotion**.

---

## 1. Các Tính năng Cốt lõi
1. **Visual Engine**: Remotion + TailwindCSS + Spring Physics (`spring()`) + Clamping Interpolations.
2. **AI Voiceover**: Chọn provider qua `TTS_PROVIDER` trong `.env`:
   - `edge`: `edge-tts-universal` (online, miễn phí, không cần API key) - xuất `.mp3`.
   - `cit`: **CIT Voice Studio** (offline, giọng tiếng Việt chất lượng phòng thu) - xuất `.wav`/`.mp3`. Tải app tại [github.com/Cuongyd196/cit-voice-studio](https://github.com/Cuongyd196/cit-voice-studio), tài liệu API: `docs/cit-voice-studio.md`.
3. **Đồng bộ Thời lượng Frame-Accurate**: Script tự động đo độ dài audio (MP3/WAV) và tính toán số frame chính xác (`durationInFrames`) cho từng phân cảnh.
4. **Bố cục Chuẩn Mobile**:
   - **Thương hiệu kênh**: Huy hiệu `⚡ [CHANNEL_NAME]` ở đỉnh giữa (`top: 150px`), tránh thanh tìm kiếm của TikTok/Shorts.
   - **Khối trung tâm**: Toàn bộ thẻ trích dẫn, sơ đồ luồng, biểu đồ so sánh nằm ở **chính giữa màn hình**.
   - **Phụ đề 1 dòng (Single-Line Caption)**: Nằm thoáng đãng phía dưới (`mt-64`), tự động tách 5–7 từ/lần, đồng bộ chuyển cụm từ theo nhịp phát âm.
   - **Chuyển cảnh dồn dập (Snappy Transition)**: Buffer chỉ `+3 frames` giữa các phân cảnh giúp video liên tục, cuốn hút.

---

## 2. Cấu hình Môi trường (.env)

Đảm bảo file `.env` tại thư mục gốc có các biến sau (đầy đủ xem `.env.example`):
```env
TTS_PROVIDER=edge            # edge | cit
TTS_OUTPUT_DIR=public/audio

# Edge TTS (TTS_PROVIDER=edge)
EDGE_TTS_VOICE=vi-VN-HoaiMyNeural
EDGE_TTS_RATE=+10%

# CIT Voice Studio (TTS_PROVIDER=cit)
CIT_TTS_BASE_URL=http://127.0.0.1:8001
CIT_TTS_VOICE=Hải Đăng       # danh sách giọng: docs/cit-voice-studio.md hoặc GET /voices
CIT_TTS_SPEED=1.1

CHANNEL_NAME="CƯỜNG IT"
```

**Khi `TTS_PROVIDER=cit`**:
- App CIT Voice Studio phải đang mở. Script tự gọi `GET /health` trước khi sinh audio; nếu báo không kết nối được, nhắc người dùng mở app (hoặc tải tại [github.com/Cuongyd196/cit-voice-studio](https://github.com/Cuongyd196/cit-voice-studio)).
- Lời thoại có thể chèn thẻ cảm xúc `[cười]`, `[thở dài]`, `[hắng giọng]` và thẻ nghỉ `[nghỉ 0.5s]` (không bị đọc thành tiếng). Không lạm dụng: tối đa 1 thẻ/cảnh.
- Lỗi `400 Voice not found` = sai tên giọng (phân biệt dấu). Kiểm tra `CIT_TTS_VOICE`.

---

## 3. Cấu trúc Kịch bản 6 Phân cảnh (50-60s / 1200-1800 frames)

| Phân cảnh | Vai trò | Mục tiêu & Bố cục Visual |
| :--- | :--- | :--- |
| **Scene 1: Hook** | Mở đầu giật gân (0s - 5s) | Tiêu đề lớn (`text-8xl font-black`), câu hỏi tò mò, icon 3D/SVG nổi bật. |
| **Scene 2: Pain Point** | Nỗi đau / Bối cảnh (5s - 12s) | Thẻ trích dẫn tâm lý (`text-5xl`), so sánh Local vs Server / Trước vs Sau. |
| **Scene 3: Solution Part 1** | Giải pháp cốt lõi (12s - 20s) | Card Container / Hộp đóng gói linh kiện, hiệu ứng spring trồi vào. |
| **Scene 4: Solution Part 2** | Quy trình hoạt động (20s - 30s) | Sơ đồ luồng dọc 3 bước (VD: Dockerfile -> Image -> Container) kèm mũi tên. |
| **Scene 5: Benefits** | Lợi ích vượt trội (30s - 40s) | 3 thẻ so sánh thông số (Tốc độ 10x, Tiết kiệm tài nguyên, Deploy mọi nơi). |
| **Scene 6: Outro & CTA** | Đúc kết & Kêu gọi (40s - 50s) | Thẻ tổng kết phát sáng, 2 nút CTA (Thả tim & Follow kênh đón xem video mới). |

---

## 4. Quy trình Tạo Video Khi Người Dùng Yêu Cầu

Khi nhận lệnh: *"Tạo video giải thích về [Chủ đề X]"*, Claude thực hiện tuần tự 5 bước:

### Bước 1: Soạn kịch bản Voiceover 6 cảnh
Soạn 6 câu thoại súc tích, tự nhiên, đánh trúng tâm lý người xem (mỗi câu 15-25 từ).

### Bước 2: Sinh Voiceover (provider theo `TTS_PROVIDER`)
Tạo script `scripts/generate-<topic>-audio.ts` gọi `generateTopicVoices` từ `generate-tts.ts`, chạy `npx tsx scripts/generate-<topic>-audio.ts`. Audio lưu vào `public/audio/<TopicName>/` (`.mp3` với edge, `.wav` với cit), `manifest.json` và `src/<TopicName>/audioData.ts` sinh tự động:
```typescript
import { generateTopicVoices } from "./scripts/generate-tts";

const scenes = [
  { id: "scene1_hook", text: "..." },
  { id: "scene2_problem", text: "..." },
  { id: "scene3_container", text: "..." },
  { id: "scene4_flow", text: "..." },
  { id: "scene5_benefits", text: "..." },
  { id: "scene6_outro", text: "..." },
];

await generateTopicVoices("<TopicName>", scenes);
```
- Tuỳ chọn mỗi cảnh: `voice` (giọng của provider đang chọn), `rate`/`pitch`/`volume` (chỉ edge), `speed` 0.5-2.0 (chỉ cit).
- File đã tồn tại được dùng lại (cache). Muốn sinh lại sau khi sửa lời thoại hoặc đổi giọng, xoá file audio tương ứng trước.

### Bước 3: Tạo thư mục Component `src/<TopicName>/`
Tạo cấu trúc component:
```text
src/<TopicName>/
├── <TopicName>.tsx          # Composition chính, chứa BrandHeader và Series các scene
├── types.ts                 # Props schema với zColor, z.string()
├── audioData.ts             # Lưu metadata frame sinh ra từ manifest.json
├── components/
│   ├── BrandHeader.tsx      # Huy hiệu kênh cố định top: 150px
│   └── SubtitleBox.tsx      # Hộp phụ đề 1 dòng (5-7 từ/lần) mt-64
└── scenes/
    ├── Scene1Hook.tsx
    ├── Scene2Problem.tsx
    ├── Scene3Solution.tsx
    ├── Scene4Flow.tsx
    ├── Scene5Benefits.tsx
    └── Scene6Outro.tsx
```

### Bước 4: Nguyên tắc Code Remotion
1. **Spring Animation**: Luôn dùng `spring({ frame, fps, config: { damping: 12, stiffness: 100 } })`.
2. **Clamped Interpolation**: Luôn có `{ extrapolateLeft: "clamp", extrapolateRight: "clamp" }`.
3. **Căn giữa nội dung**: `<AbsoluteFill className="flex flex-col items-center justify-center px-10 text-white">`.
4. **Phụ đề**: Đặt `<SubtitleBox text="..." durationInFrames={d} className="mt-64" />` ngay dưới khối trung tâm.
5. **Thời lượng cảnh**: `const d1 = audioManifest.scenes[0].durationInFrames + 3;` (Buffer snappy `+3 frames`).
6. **Đường dẫn audio**: Luôn dùng `staticFile(audioManifest.scenes[i].audioPath)`, KHÔNG hardcode đuôi `.mp3` (provider cit xuất `.wav`).

### Bước 5: Đăng ký Composition vào `src/Root.tsx`
Thêm `<Composition>` vào [src/Root.tsx](file:///d:/cuongit/25-26/shortvideo/public-git/remotion-cuongit-template/src/Root.tsx) với `width={1080}`, `height={1920}`, `fps={30}` và tổng `durationInFrames`.

---

## 5. Lệnh Kiểm tra & Render
- **Xem trước trong Remotion Studio**: `npm run dev` -> Mở [http://localhost:3000](http://localhost:3000).
- **Kiểm tra ảnh tĩnh (Still)**: `npx remotion still <TopicName> out/preview.png --frame 200`.
- **Render video MP4 hoàn chỉnh**: `npx remotion render <TopicName> out/<TopicName>.mp4`.
