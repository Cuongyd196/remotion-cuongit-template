# Remotion CuongIT Template

This repository contains programmatic video templates built with [Remotion](https://www.remotion.dev/), designed for creating educational content for TikTok, YouTube Shorts, and Reels.

## 📺 Demo Videos

| 🐧 Linux File System | 🐳 Docker Introduction |
|-------------------|---------------------|
| [![Linux Demo](https://img.youtube.com/vi/VF75KP0kfEA/0.jpg)](https://youtube.com/shorts/VF75KP0kfEA?feature=share) | [![Docker Demo](https://img.youtube.com/vi/IWGXAhI2N3A/0.jpg)](https://youtube.com/shorts/IWGXAhI2N3A?feature=share) |
| [Watch on YouTube](https://youtube.com/shorts/VF75KP0kfEA?feature=share) | [Watch on YouTube](https://youtube.com/shorts/IWGXAhI2N3A?feature=share) |

## 🚀 Features
- **Code-driven animation**: Videos are generated using React and TypeScript.
- **Tailwind CSS**: Styled for rapid and consistent design.
- **TikTok/Shorts Optimized**: 9:16 aspect ratio (1080x1920) with "Safe Zone" padding.
- **Components**: Reusable slides for educational technical content.

## 🛠️ Compositions included
1. **LinuxFileSystem**: A 50s vertical video explaining the Linux Directory Structure (`/`, `/bin`, `/home`, etc.).
2. **DockerIntro**: A vertical video introducing Docker concepts.

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Cuongyd196/remotion-cuongit-template.git
   cd remotion-cuongit-template
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🎬 Usage

**Start Preview Studio:**
```bash
npm run dev
```

**Render Video:**
```bash
# Render Linux video
npx remotion render LinuxFileSystem

# Render Docker video
npx remotion render DockerIntro
```

## 👨‍💻 Author
**CuongIT**

## 📝 License
Licensed under the MIT License.
