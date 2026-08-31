---
name: remotion-topic-explainer
description: >-
  Creates professional 50-60s vertical explainer videos (9:16 format, 1080x1920 @ 30fps) for any given topic using Remotion, styled with modern aesthetics and narrated by natural voiceover using edge-tts-universal. Follows remotion-dev/skills best practices for smooth springs, typography, sequence timing, and visual engagement.
---

# Remotion Topic Explainer Video Skill (50-60s)

This skill guides you in creating high-quality, 50–60 second short-form explainer videos (TikTok / YouTube Shorts / Reels format: 1080x1920 @ 30fps) from any given topic.

It combines:
1. **Visual Best Practices** from `remotion-dev/skills` (frame-accurate springs, clamping interpolations, sequence composition, typography hierarchy).
2. **AI Voiceover Synthesis** powered by `edge-tts-universal` configured via `.env` (Vietnamese, English, etc.).
3. **Exact Timing Synchronization** mapping audio voiceover lengths directly into Remotion frame sequences.

---

## 1. Video Structure & Timing (50-60s / 1500-1800 frames @ 30fps)

A captivating short video follows the **Hook-Problem-Solution-Value-Outro** framework:

| Scene | Name | Time | Frame Range (@ 30fps) | Purpose & Visuals |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Hook** | 0s – 5s | ~150 frames | Gây chú ý tức thì: Tiêu đề lớn, câu hỏi kích thích tò mò, floating badge. |
| **2** | **Context / Pain Point** | 5s – 15s | ~300 frames | Nêu vấn đề hoặc bối cảnh vì sao chủ đề này quan trọng. Icon cảnh báo/so sánh. |
| **3** | **Core Concept Part 1** | 15s – 28s | ~390 frames | Giải thích nguyên lý cốt lõi thứ 1: Card kính, biểu tượng minh họa, từ khóa nổi bật. |
| **4** | **Core Concept Part 2** | 28s – 42s | ~420 frames | Mở rộng chi tiết hoặc cơ chế hoạt động: Quy trình 3 bước, sơ đồ luồng mượt mà. |
| **5** | **Real-World Impact** | 42s – 52s | ~300 frames | Ứng dụng thực tế, lời khuyên thực chiến hoặc số liệu ấn tượng. |
| **6** | **Outro & CTA** | 52s – 60s | ~240 frames | Đúc kết 1 câu đắt giá, lời kêu gọi Like/Share/Follow & thương hiệu cá nhân. |

**Tổng thời lượng:** 1500 – 1800 frames (khoảng 50 – 60 giây).

---

## 2. TTS Voiceover Generation (`edge-tts-universal`)

### 2.1 Cấu hình Voice qua `.env`
Đảm bảo file `.env` đã được cấu hình:
```env
EDGE_TTS_VOICE=vi-VN-HoaiMyNeural    # hoặc vi-VN-NamMinhNeural, en-US-ChristopherNeural
EDGE_TTS_RATE=+10%                   # +10% đến +15% giúp video ngắn nhịp độ nhanh cuốn hút
EDGE_TTS_PITCH=+0Hz
EDGE_TTS_VOLUME=+0%
EDGE_TTS_OUTPUT_DIR=public/audio
```

### 2.2 Quy trình sinh file Audio
Khi nhận chủ đề, tạo file kịch bản voiceover và chạy script `scripts/generate-tts.ts` để sinh audio:

```typescript
import { generateTopicVoices } from "../../scripts/generate-tts";

const scenes = [
  {
    id: "scene1_hook",
    text: "Bạn có biết Docker thực chất là gì và tại sao mọi lập trình viên đều cần nó?",
  },
  {
    id: "scene2_problem",
    text: "Trước đây, câu nói 'trên máy tôi vẫn chạy được' luôn là cơn ác mộng khi bàn giao sản phẩm.",
  },
  {
    id: "scene3_concept1",
    text: "Docker giải quyết việc này bằng Container - đóng gói toàn bộ code và môi trường vào một khối duy nhất.",
  },
  {
    id: "scene4_concept2",
    text: "Khác với máy ảo nặng nề, Docker chia sẻ chung nhân hệ điều hành, giúp khởi động chỉ trong tích tắc.",
  },
  {
    id: "scene5_impact",
    text: "Nhờ đó, bạn deploy ứng dụng mượt mà trên mọi máy chủ từ AWS, GCP cho đến VPS giá rẻ.",
  },
  {
    id: "scene6_outro",
    text: "Follow kênh để nắm trọn các kiến thức công nghệ ngắn gọn mỗi ngày nhé!",
  },
];

await generateTopicVoices("DockerShort", scenes);
```

File âm thanh sẽ được lưu tự động vào `public/audio/<TopicName>/<sceneId>.mp3` kèm file `manifest.json` ghi lại chính xác số frame (`durationInFrames`) cho từng phân cảnh.

---

## 3. Remotion Coding Rules (from `remotion-dev/skills`)

Khi viết mã nguồn Remotion, BẮT BUỘC tuân thủ các nguyên tắc sau:

### 3.1 Sử dụng Spring Animations
Không dùng CSS keyframes/transitions hay linear easing vô hồn. Dùng `spring()`:
```tsx
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// Spring nảy mượt mà cho Card/Icon
const scale = spring({
  frame,
  fps,
  config: {
    damping: 12,    // Dưới 15 tạo độ nảy đàn hồi tự nhiên
    stiffness: 100,  // Độ căng
    mass: 0.8,
  },
});

const entrance = spring({
  frame: frame - 10, // Delay 10 frames
  fps,
  from: 50,
  to: 0,
});
```

### 3.2 Interpolation An toàn (Always Clamp)
Luôn luôn cung cấp `extrapolateLeft: "clamp"` và `extrapolateRight: "clamp"` để tránh tràn giá trị khi timeline chạy ngoài phạm vi:
```tsx
import { interpolate } from "remotion";

const opacity = interpolate(frame, [0, 15], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
```

### 3.3 Nhúng Audio và Đồng bộ Sequence
Mỗi scene trong Composition dùng `<Sequence>` hoặc `<Series>` để quản lý timing chính xác:
```tsx
import { Audio, staticFile, Sequence } from "remotion";

// Trong Scene component:
<Sequence from={0} durationInFrames={sceneDuration}>
  <Audio src={staticFile(`audio/${topicName}/scene1_hook.mp3`)} />
  <SceneContent />
</Sequence>
```

4. **Buffer Chuyển cảnh Tinh gọn (Snappy Transition Buffer)**:
   - Khoảng đệm giữa các cảnh chỉ nên để **+3 đến +4 frames** (khoảng 0.1s) sau khi giọng đọc kết thúc.
   - Tránh để buffer quá dài (+15 đến +20 frames) gây ra khoảng lặng/chết nhịp giữa các phân cảnh. Cảnh tiếp theo cần xuất hiện ngay khi câu trước vừa dứt để duy trì nhịp độ dồn dập, hấp dẫn cho video ngắn.

```tsx
// Ví dụ tính thời lượng các cảnh trong Series
const d1 = audioManifest.scenes[0].durationInFrames + 3;
const d2 = audioManifest.scenes[1].durationInFrames + 3;
// ...
```


### 3.4 Quy chuẩn Thiết kế Visual (Vertical 1080x1920)
1. **Background**: Dark Mode cao cấp (`bg-slate-950` hoặc gradient `from-slate-950 via-zinc-900 to-black`) kết hợp hiệu ứng radial glow/grid mờ.
2. **Glassmorphism Cards**:
   - `backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl`
3. **Thương hiệu Kênh Phía Trên (Brand Header)**:
   - Luôn hiển thị component thương hiệu `⚡ [CHANNEL_NAME]` ở phía trên ở giữa (`top: 150px`, `left: 50%` translate-x) đọc từ biến môi trường `CHANNEL_NAME` (mặc định: "CƯỜNG IT") để tránh bị thanh tìm kiếm và tab Đang theo dõi / Dành cho bạn của nền tảng (TikTok, Shorts, Reels) che khuất.
4. **Typography Tối ưu cho Mobile (1080x1920)**:
   - Tiêu đề chính: 72px - 96px, in đậm font-black, gradient sắc nét.
   - Nội dung thẻ / trích dẫn: 40px - 50px font-extrabold.
   - Text phụ / giải thích: 28px - 36px font-semibold.
   - Badge danh mục: 28px - 32px font-black uppercase.
5. **Bố cục Trung tâm & Phụ đề 1 Dòng (Single-Line Chunked Caption)**:
   - **Bố cục chính**: Toàn bộ khối nội dung quan trọng BẮT BUỘC nằm ở **chính giữa màn hình** (`justify-center` theo chiều dọc).
   - **Vị trí Phụ đề**: Nằm phía dưới khối trung tâm với khoảng cách thoáng đãng (`mt-64`), không bị che bởi thanh công cụ dưới của TikTok/Reels.
   - **Định dạng 1 dòng**: Phụ đề chỉ xuất hiện **1 dòng duy nhất (khoảng 5-7 từ)**, chữ to `text-4xl font-black`, tự động cắt theo cụm câu và chuyển đổi mượt mà theo đúng tiến trình giọng đọc (`durationInFrames`). Dùng pill card `rounded-full bg-slate-950/95 border-2 border-sky-400/50 px-10 py-5` với highlight từ khóa.

---

## 4. Quy trình Tạo Video Từng Bước cho Antigravity

Khi nhận được yêu cầu: *"Tạo video giải thích về [Chủ đề X]"*:

### Bước 1: Soạn Kịch bản (Scripting)
1. Xác định 6 phân cảnh (Hook, Problem, Concept 1, Concept 2, Impact, Outro).
2. Viết lời thoại tiếng Việt tự nhiên, súc tích, câu ngắn (mỗi cảnh 15-30 từ).

### Bước 2: Sinh Giọng Đọc (TTS Generation)
1. Tạo script TTS tạm hoặc gọi trực tiếp `scripts/generate-tts.ts` cho topic đó.
2. Lấy danh sách thời lượng frame thực tế từ `manifest.json`.

### Bước 3: Tạo Thư mục Code `src/<TopicName>/`
Cấu trúc thư mục chuẩn:
```text
src/<TopicName>/
├── <TopicName>.tsx          # Main composition tập hợp các Series.Sequence
├── types.ts                 # Schema & Props
├── audioData.ts             # Metadata thời lượng audio
└── scenes/
    ├── Scene1Hook.tsx
    ├── Scene2Problem.tsx
    ├── Scene3Concept1.tsx
    ├── Scene4Concept2.tsx
    ├── Scene5Impact.tsx
    └── Scene6Outro.tsx
```

### Bước 4: Đăng ký Composition vào `src/Root.tsx`
Thêm Composition mới vào `src/Root.tsx`:
```tsx
<Composition
  id="<TopicName>"
  component={<TopicName>}
  durationInFrames={totalFrames}
  fps={30}
  width={1080}
  height={1920}
  defaultProps={{}}
/>
```

### Bước 5: Kiểm tra và Báo cáo
1. Chạy `npm run lint` để kiểm tra lỗi TypeScript/ESLint.
2. Báo cáo cho người dùng link mở Composition trên Remotion Studio (`http://localhost:3000`) hoặc lệnh render MP4:
   ```bash
   npx remotion render <TopicName> out/<TopicName>.mp4
   ```
