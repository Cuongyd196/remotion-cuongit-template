# 🎬 Remotion AI Short Video Explainer Template

<div align="center">

[![Remotion](https://img.shields.io/badge/Remotion-v4.0+-blue?style=for-the-badge&logo=react)](https://www.remotion.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Edge TTS](https://img.shields.io/badge/Edge_TTS-AI_Voiceover-brightgreen?style=for-the-badge)](https://www.npmjs.com/package/edge-tts-universal)
[![AI Skills](https://img.shields.io/badge/AI_Skills-Antigravity_%7C_Claude-purple?style=for-the-badge)](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Automated 50–60s vertical video generation framework (9:16) for tech & coding explainers using React, Remotion, and AI Voiceover.**

<br />

<a href="https://youtube.com/shorts/1bs4prcg-Fc?feature=share" target="_blank" rel="noopener noreferrer">
  <img src="assets/demo-preview.png" alt="Demo Video Preview" width="340" style="border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.6);" />
</a>

<p><em>Mobile-first 9:16 vertical layout with <strong>⚡ CƯỜNG IT</strong> brand header, centered core visual & single-line subtitle</em></p>

<p><a href="https://youtube.com/shorts/1bs4prcg-Fc?feature=share" target="_blank" rel="noopener noreferrer"><strong>▶️ Watch Demo Video on YouTube Shorts</strong></a></p>

[✨ Key Features](#-key-features) • [🚀 Quickstart](#-quickstart) • [🎙️ Voiceover Config](#️-edge-tts-voiceover-configuration) • [🤖 AI Skills Integration](#-ai-skills-integration-antigravity--claude) • [🎬 Preview & Render](#-preview--rendering)

</div>

---

## 👨‍💻 Author & Channels
- **Author:** [Cuong IT (Cuongyd196)](https://www.facebook.com/cuongit96/)
- 🎵 **TikTok:** [@cuongit96](https://www.tiktok.com/@cuongit96)
- 🌐 **Facebook Reels:** [Cuong IT Reels](https://www.facebook.com/cuongit96/reels/)


---

## 🌟 Key Features

- ⚡ **Video-as-Code:** Build full animations, transitions, and motion graphics entirely in React and Remotion.
- 🎙️ **Free AI Voiceover (`edge-tts-universal`):** Automatically generate natural narration (Vietnamese `vi-VN-HoaiMyNeural`, `vi-VN-NamMinhNeural`, English, Japanese, etc.) without requiring paid API keys.
- ⏱️ **Frame-Accurate Synchronization:** Directly measures MP3 durations to compute frame counts (`durationInFrames`) for each scene with zero desync.
- 📱 **Mobile-First 9:16 Design (1080x1920 @ 30fps):**
  - **Centered Layout:** Hero cards, comparisons, and flowcharts stay vertically centered in viewer eye-lines.
  - **Brand Header:** `⚡ CƯỜNG IT` badge fixed at `top: 150px`, staying clear of platform search bars.
  - **Single-Line Subtitle:** Auto-chunked into 5–7 words per phrase, `text-4xl` font, synchronized to spoken audio.
  - **Snappy Transitions:** Only `+3 frames` buffer between scenes keeps the video fast-paced and engaging.
- 🤖 **AI-Agent Ready:** Includes pre-built custom skills for both **Google Antigravity** and **Anthropic Claude**.

---

## 📐 6-Scene Narrative Framework (50–60s)

```
[Scene 1: Hook (0s-5s)]       -> Capture instant attention with a bold question & 8xl title
[Scene 2: Pain Point (5s-12s)] -> Relatable dilemma & comparison (Local Machine vs Server Crash)
[Scene 3: Solution (12s-20s)]  -> Introduce core concept (All-in-one Container Box)
[Scene 4: Workflow (20s-29s)]  -> 3-step lifecycle diagram (Dockerfile -> Image -> Container)
[Scene 5: Benefits (29s-37s)]  -> 3 key advantages (10x Lighter, Resource-efficient, Multi-Cloud)
[Scene 6: Outro & CTA (37s-43s)]-> Key takeaway + Like & Follow call-to-action
```

---

## 🚀 Quickstart

### 1. Clone & Install
```bash
git clone https://github.com/Cuongyd196/remotion-cuongit-template.git
cd remotion-cuongit-template
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configuration keys in `.env`:
```env
# AI Voiceover Voice ID
EDGE_TTS_VOICE=vi-VN-HoaiMyNeural
EDGE_TTS_RATE=+10%
EDGE_TTS_PITCH=+0Hz
EDGE_TTS_VOLUME=+0%
EDGE_TTS_OUTPUT_DIR=public/audio

# Channel Branding (Top Header)
CHANNEL_NAME="CƯỜNG IT"
```

---

## 🎙️ Edge TTS Voiceover Configuration

Popular AI voices supported out-of-the-box:
- **Vietnamese Female:** `vi-VN-HoaiMyNeural`
- **Vietnamese Male:** `vi-VN-NamMinhNeural`
- **English:** `en-US-ChristopherNeural`, `en-US-GuyNeural`, `en-US-AriaNeural`

Generate voiceovers from CLI:
```bash
# Generate a single narration clip
npm run tts -- --text "Hello everyone, today we explore how Docker works." public/audio/test.mp3
```

---

## 🤖 AI Skills Integration (Antigravity & Claude)

The repository provides ready-to-use skill definitions for AI agents:

| AI Platform | Skill File Location | Activation Guide |
| :--- | :--- | :--- |
| **Anthropic Claude** | `.claude/skills/remotion-topic-explainer/SKILL.md` | Auto-detected in **Claude Code CLI** and **Claude Desktop Projects**. |
| **Google Antigravity**| `.agents/skills/remotion-topic-explainer/SKILL.md` | Auto-detected in **Antigravity IDE** and CLI. |

### Prompt Example:
> *"Create a 50-60s vertical explainer video about [Your Topic: e.g. Docker, Redis, Kubernetes, Git Rebase, WebSocket]"*

**The AI Agent will automatically:**
1. Draft a structured 6-scene script tailored for short-form video.
2. Run `generate-tts.ts` to synthesize voiceovers and compute exact frame timings.
3. Build Remotion React components with spring animations and modern typography.
4. Register the new Composition in `src/Root.tsx`.

---

## 🎬 Preview & Rendering

### 1. Launch Remotion Studio
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser for real-time visual timeline editing.

### 2. Render Still Thumbnail
```bash
npx remotion still DockerExplainer out/preview.png --frame 200
```

### 3. Render Final MP4 Video
```bash
npx remotion render DockerExplainer out/DockerExplainer.mp4
```

---

## 📂 Project Structure

```text
remotion-cuongit-template/
├── .agents/skills/          # Google Antigravity Skill
├── .claude/skills/          # Anthropic Claude Custom Skill
├── .env.example             # Environment variable template
├── public/
│   └── audio/               # Generated MP3 voiceover files
├── scripts/
│   ├── generate-tts.ts      # Automated TTS generator & frame calculator
│   └── generate-docker-audio.ts # Example Docker narration script
├── src/
│   ├── DockerExplainer/     # Docker Explainer Composition
│   │   ├── DockerExplainer.tsx  # Master sequence & animated glows
│   │   ├── types.ts             # Schema & Props
│   │   ├── audioData.ts         # Audio frame duration metadata
│   │   ├── components/
│   │   │   ├── BrandHeader.tsx  # Channel Brand Badge (top: 150px)
│   │   │   └── SubtitleBox.tsx  # Single-line chunked subtitle (mt-64)
│   │   └── scenes/
│   │       ├── Scene1Hook.tsx
│   │       ├── Scene2Problem.tsx
│   │       ├── Scene3Container.tsx
│   │       ├── Scene4ImageDockerfile.tsx
│   │       ├── Scene5Benefits.tsx
│   │       └── Scene6Outro.tsx
│   ├── Root.tsx             # Remotion Composition Registration
│   └── index.css            # TailwindCSS styles
└── remotion.config.ts       # Remotion bundle & render config
```

---

## 📄 License
This project is open-source and available under the **[MIT License](LICENSE)**.
