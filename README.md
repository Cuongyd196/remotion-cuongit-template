# Remotion CuongIT Template

Repository này chứa các template video được lập trình bằng [Remotion](https://www.remotion.dev/), dùng để tạo nội dung giáo dục cho TikTok, YouTube Shorts và Reels.

## 👨‍💻 Tác giả
**[CuongIT](https://www.facebook.com/cuongit96/)**

## 🔔 Theo dõi để xem thêm video
- [TikTok @cuongit96](https://www.tiktok.com/@cuongit96)
- [Facebook Reels](https://www.facebook.com/cuongit96/reels/)

## 📺 Video Demo

| 🐧 Hệ thống File Linux | 🐳 Giới thiệu Docker |
|-------------------|---------------------|
| [![Linux Demo](https://img.youtube.com/vi/VF75KP0kfEA/0.jpg)](https://youtube.com/shorts/VF75KP0kfEA?feature=share) | [![Docker Demo](https://img.youtube.com/vi/IWGXAhI2N3A/0.jpg)](https://youtube.com/shorts/IWGXAhI2N3A?feature=share) |
| [Xem trên YouTube](https://youtube.com/shorts/VF75KP0kfEA?feature=share) | [Xem trên YouTube](https://youtube.com/shorts/IWGXAhI2N3A?feature=share) |

### 🎙️ Demo bản nâng cao (Tích hợp Voice)
- [Xem trên Facebook](https://www.facebook.com/reel/1528707462238368)
- [Xem trên TikTok](https://www.tiktok.com/@cuongit96/video/7599192554772516117)

## 🚀 Tính năng
- **Tạo video bằng code**: Video được tạo bằng React và TypeScript.
- **Tailwind CSS**: Tạo kiểu nhanh và nhất quán.
- **Tối ưu cho TikTok/Shorts**: Tỷ lệ khung hình 9:16 (1080x1920) kèm khoảng đệm "Safe Zone".
- **Components**: Các slide có thể tái sử dụng cho nội dung kỹ thuật giáo dục.

## 🛠️ Các composition có sẵn
1. **LinuxFileSystem**: Video dọc 50 giây giải thích cấu trúc thư mục Linux (`/`, `/bin`, `/home`, v.v.).
2. **DockerIntro**: Video dọc giới thiệu các khái niệm về Docker.

## 📦 Cài đặt

1. Clone repository:
   ```bash
   git clone https://github.com/Cuongyd196/remotion-cuongit-template.git
   cd remotion-cuongit-template
   ```

2. Cài đặt dependencies:
   ```bash
   npm install
   ```

## 🎬 Sử dụng

**Khởi động Preview Studio:**
```bash
npm run dev
```

![Remotion Studio](assets/studio.png)

**Render Video:**

Có thể render video trực tiếp trên giao diện Remotion Studio (nhấn nút "Render" ở composition muốn xuất), hoặc dùng command line:
```bash
# Render video Linux
npx remotion render LinuxFileSystem

# Render video Docker
npx remotion render DockerIntro
```

## 📝 Giấy phép
Phát hành theo giấy phép MIT License.
