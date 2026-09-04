# 🎬 Remotion AI Short Video Explainer Template

<div align="center">

[![Remotion](https://img.shields.io/badge/Remotion-v4.0+-blue?style=for-the-badge&logo=react)](https://www.remotion.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Edge TTS](https://img.shields.io/badge/Edge_TTS-AI_Voiceover-brightgreen?style=for-the-badge)](https://www.npmjs.com/package/edge-tts-universal)
[![AI Skills](https://img.shields.io/badge/AI_Skills-Antigravity_%7C_Claude-purple?style=for-the-badge)](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

** Tự động tạo video ngắn (9:16) giải thích kiến thức với Remotion và AI.**

<br />

<a href="https://youtube.com/shorts/791T9vQ229A?si=8H17eP51gI333oA6" target="_blank" rel="noopener noreferrer">
  <img src="assets/demo-preview.png" alt="Demo Video Preview" width="340" style="border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.6);" />
</a>

<p><em>Giao diện video dọc 9:16 chuẩn mobile với thương hiệu <strong>⚡ CƯỜNG IT</strong>, bố cục căn giữa và phụ đề 1 dòng</em></p>

<p><a href="https://facebook.com/reel/27974855735519825" target="_blank" rel="noopener noreferrer"><strong>▶️ Xem Video Demo trên Reels</strong></a></p>

[✨ Tính năng nổi bật](#-tính-năng-nổi-bật) • [🚀 Cài đặt nhanh](#-cài-đặt-nhanh) • [🎙️ Cấu hình Voiceover](#️-cấu-hình-giọng-đọc-edge-tts) • [🤖 Tích hợp AI Skills](#-tích-hợp-ai-skills-antigravity--claude) • [🎬 Lệnh Render](#-xem-trước--render) • [💬 Cộng đồng & Hỗ trợ](#-cộng-đồng--các-mẫu-video-khác)

</div>

---

## 👨‍💻 Tác giả & Kênh nội dung
- **Tác giả:** [Cường IT (Cuongyd196)](https://www.facebook.com/cuongit96/)
- 🎵 **TikTok:** [@cuongit96](https://www.tiktok.com/@cuongit96)
- 🌐 **Facebook Reels:** [Cường IT Reels](https://www.facebook.com/cuongit96/reels/)
- 👥 **Nhóm Facebook:** [facebook.com/groups/1010029065373486](https://www.facebook.com/groups/1010029065373486/)
- 👥 **Nhóm Zalo:** [zalo.me/g/8bfeotyh5ewtkzxmp5gt](https://zalo.me/g/8bfeotyh5ewtkzxmp5gt)


---

## 🌟 Tính năng nổi bật

- ⚡ **Lập trình Video bằng Code (Video-as-Code):** Dựng toàn bộ animation, transition, visual effects hoàn toàn bằng React và Remotion.
- 🎙️ **Tích hợp Giọng đọc AI Miễn phí (`edge-tts-universal`):** Tự động sinh giọng đọc tự nhiên (tiếng Việt `vi-VN-HoaiMyNeural`, `vi-VN-NamMinhNeural`, tiếng Anh, tiếng Nhật, v.v.), không cần API key.
- ⏱️ **Đồng bộ Frame Timing chính xác (Frame-Accurate):** Tự động phân tích thời lượng file âm thanh MP3 để tính số frame khớp 100% cho từng cảnh.
- 📱 **Thiết kế Chuẩn Mobile 9:16 (1080x1920 @ 30fps):**
  - **Khối nội dung trung tâm (Centered Layout):** Thẻ trích dẫn, so sánh, sơ đồ luồng luôn nằm ở trọng tâm mắt nhìn.
  - **Thương hiệu Kênh (Brand Header):** Huy hiệu `⚡ CƯỜNG IT` cố định tại `top: 150px`, an toàn tuyệt đối, không bị che bởi thanh tìm kiếm.
  - **Phụ đề 1 Dòng (Single-Line Chunked Subtitle):** Tự động ngắt 5–7 từ/lần, cỡ chữ lớn `text-4xl`, nhảy cụm từ mượt mà theo nhịp đọc.
  - **Nhịp chuyển cảnh nhanh (Snappy Buffer):** Độ trễ giữa các cảnh chỉ `+3 frames` (~0.1s), giữ nhịp điệu video dồn dập, giữ chân người xem.
- 🤖 **Sẵn sàng cho AI Agent:** Tích hợp bộ Skill sẵn có cho cả **Google Antigravity** và **Anthropic Claude**.

---

## 📐 Cấu trúc Kịch bản Chuẩn (50–60 Giây)

Video ngắn áp dụng mô hình tâm lý thu hút người xem gồm 6 phân cảnh:

```
[Scene 1: Hook (0s-5s)]       -> Gây chú ý tức thì bằng câu hỏi tò mò & Title lớn 8xl
[Scene 2: Pain Point (5s-12s)] -> Trích dẫn nỗi đau thực tế & so sánh Local vs Server
[Scene 3: Solution (12s-20s)]  -> Giới thiệu giải pháp cốt lõi (Container 3D Box)
[Scene 4: Workflow (20s-29s)]  -> Quy trình hoạt động 3 bước (Dockerfile -> Image -> Run)
[Scene 5: Benefits (29s-37s)]  -> 3 lợi ích vượt trội (Nhẹ 10x, Tiết kiệm RAM, Multi-Cloud)
[Scene 6: Outro & CTA (37s-43s)]-> Tổng kết đắt giá + Kêu gọi Thả tim & Follow kênh
```

---

## 🚀 Cài đặt nhanh

### 1. Clone repository & Cài đặt thư viện
```bash
git clone https://github.com/Cuongyd196/remotion-cuongit-template.git
cd remotion-cuongit-template
npm install
```

### 2. Thiết lập biến môi trường `.env`
Sao chép file `.env.example` thành `.env`:
```bash
cp .env.example .env
```

Nội dung cấu hình trong `.env`:
```env
# Giọng đọc AI Voiceover
EDGE_TTS_VOICE=vi-VN-HoaiMyNeural
EDGE_TTS_RATE=+10%
EDGE_TTS_PITCH=+0Hz
EDGE_TTS_VOLUME=+0%
EDGE_TTS_OUTPUT_DIR=public/audio

# Thương hiệu kênh (Hiển thị góc trên giữa video)
CHANNEL_NAME="CƯỜNG IT"
```

---

## 🎙️ Cấu hình Giọng đọc Edge TTS

Hỗ trợ nhiều giọng đọc AI chất lượng cao:
- **Tiếng Việt Nữ (Truyền cảm):** `vi-VN-HoaiMyNeural`
- **Tiếng Việt Nam (Trầm ấm, rõ ràng):** `vi-VN-NamMinhNeural`
- **Tiếng Anh (Kể chuyện / Tin tức):** `en-US-ChristopherNeural`, `en-US-GuyNeural`, `en-US-AriaNeural`

Sinh giọng đọc thủ công qua terminal:
```bash
# Sinh giọng đọc cho 1 đoạn văn bản đơn
npm run tts -- --text "Xin chào các bạn, hôm nay chúng ta cùng tìm hiểu về Docker." public/audio/test.mp3
```

---

## 🤖 Tích hợp AI Skills (Antigravity & Claude)

Repository đi kèm bộ Skill định nghĩa sẵn giúp AI tự động tạo video hoàn chỉnh:

| Nền tảng | Đường dẫn Skill File | Cách kích hoạt |
| :--- | :--- | :--- |
| **Claude Extension (VS Code)** / **Claude Code** | `.claude/skills/remotion-topic-explainer/SKILL.md` | Dùng Slash Command: `/remotion-topic-explainer [tên chủ đề]` |
| **Anthropic Claude Desktop / Projects** | `.claude/skills/remotion-topic-explainer/SKILL.md` | Tự động nhận diện qua Custom Skills trong Workspace. |
| **Google Antigravity** | `.agents/skills/remotion-topic-explainer/SKILL.md` | Tự động nhận diện trong **Antigravity IDE** hoặc CLI. |

### Cách sử dụng nhanh:

**1. Trong VS Code với Claude Extension / Claude Code:**
Gõ trực tiếp slash command:
```bash
/remotion-topic-explainer Docker
/remotion-topic-explainer Kubernetes
/remotion-topic-explainer Redis Caching
```

**2. Bằng câu lệnh tự nhiên (Natural Language Prompt):**
> *"Tạo video ngắn 50-60s giải thích về [Chủ đề của bạn: Docker, Redis, Kubernetes, Git Rebase, WebSocket...]"*

---

### Quy trình tự động hóa của AI Agent:
1. **Soạn kịch bản** chuẩn 6 phân cảnh (Hook, Problem, Solution, Workflow, Benefits, Outro & CTA).
2. **Gọi script TTS** (`generate-tts.ts`) để sinh audio giọng đọc và đo chính xác frame duration cho từng cảnh.
3. **Thiết kế visual mobile** (căn giữa nội dung, huy hiệu thương hiệu `⚡ CƯỜNG IT`, subtitle 1 dòng gãy gọn).
4. **Code React Remotion** với animation spring nảy mượt mà và đăng ký Composition vào `src/Root.tsx`.


---

## 🎬 Xem trước & Render

### 1. Khởi chạy Remotion Preview Studio
```bash
npm run dev
```
Mở trình duyệt tại **[http://localhost:3000](http://localhost:3000)** để xem và tinh chỉnh timeline theo thời gian thực.

### 2. Render ảnh tĩnh (Still Thumbnail)
```bash
npx remotion still DockerExplainer out/preview.png --frame 200
```

### 3. Xuất Video MP4 hoàn chỉnh
```bash
npx remotion render DockerExplainer out/DockerExplainer.mp4
```

---

## 📂 Cấu trúc Thư mục Dự án

```text
remotion-cuongit-template/
├── .agents/skills/          # AI Skill cho Google Antigravity
├── .claude/skills/          # AI Skill cho Anthropic Claude
├── .env.example             # File mẫu cấu hình biến môi trường
├── public/
│   └── audio/               # Thư mục lưu trữ voiceover MP3 được sinh ra
├── scripts/
│   ├── generate-tts.ts      # Engine sinh Voiceover TTS tự động & tính frame
│   └── generate-docker-audio.ts # Kịch bản mẫu cho Docker
├── src/
│   ├── DockerExplainer/     # Composition video giải thích Docker
│   │   ├── DockerExplainer.tsx  # Sequence Master & Animated Background
│   │   ├── types.ts             # Schema & Props
│   │   ├── audioData.ts         # Metadata thời lượng audio từng cảnh
│   │   ├── components/
│   │   │   ├── BrandHeader.tsx  # Huy hiệu kênh CƯỜNG IT (top: 150px)
│   │   │   └── SubtitleBox.tsx  # Subtitle 1 dòng (5-7 từ/lần, mt-64)
│   │   └── scenes/
│   │       ├── Scene1Hook.tsx
│   │       ├── Scene2Problem.tsx
│   │       ├── Scene3Container.tsx
│   │       ├── Scene4ImageDockerfile.tsx
│   │       ├── Scene5Benefits.tsx
│   │       └── Scene6Outro.tsx
│   ├── Root.tsx             # Đăng ký Composition Remotion
│   └── index.css            # TailwindCSS styles
└── remotion.config.ts       # Cấu hình render Remotion
```

---

## 💬 Cộng đồng & Các mẫu Video khác

### 🎬 Xem các mẫu tạo video khác tại:
- Link repo tạo video từ 1 đường Link/Bài viết: 🔗 [github.com/Cuongyd196/auto-video-gen](https://github.com/Cuongyd196/auto-video-gen)
- Link tạo video so sánh kiến thức: 🔗 [github.com/Cuongyd196/auto-compare-video](https://github.com/Cuongyd196/auto-compare-video)

### 🤝 Tham gia cộng đồng:
Mình tạo nhóm này cho các bạn trao đổi về Làm Video với AI nhé.  
Với các repo mình công khai, có vướng mắc mình sẽ giải đáp cho các bạn.

- 👥 Nhóm trên Facebook: [facebook.com/groups/1010029065373486](https://www.facebook.com/groups/1010029065373486/)
- 👥 Nhóm trên Zalo: [zalo.me/g/8bfeotyh5ewtkzxmp5gt](https://zalo.me/g/8bfeotyh5ewtkzxmp5gt)

⭐ **Nếu hữu ích với các bạn thì cho mình 1 star GitHub nhé 🌟**

---

## 📄 Giấy phép (License)
Dự án được phân phối dưới giấy phép **[MIT License](LICENSE)**. Tự do sử dụng cho mục đích cá nhân và thương mại.
