import { generateTopicVoices } from "./generate-tts";

const scenes = [
  { id: "01_hook", text: "Muốn đưa video lên website mà người xem không phải tải về? Theo blog Cường IT, chỉ cần sửa một chút đường link Google Drive và dùng iframe, không cần plugin." },
  { id: "02_source", text: "Đây là bài hướng dẫn trên blog Cường IT. Theo bài viết, Google Drive không chỉ lưu trữ mà còn phát video trực tuyến, nhúng vào WordPress, Moodle, Blogger hoặc HTML thuần." },
  { id: "03_link", text: "Đầu tiên, tải video lên Drive, chuột phải chọn Chia sẻ, đặt quyền ai có liên kết đều xem, rồi sao chép link. Thay đoạn view bằng preview là có link nhúng." },
  { id: "04_iframe", text: "Sau đó, trong phần HTML, chèn iframe trỏ tới link preview. Theo bài viết, mã mẫu giúp video hiển thị tỉ lệ mười sáu chín và responsive trên mọi màn hình." },
  { id: "05_options", text: "Muốn tùy chỉnh? Bài viết gợi ý thêm autoplay bằng một, mute bằng một để tự động phát, start bằng sáu mươi để phát từ giây sáu mươi, hoặc đặt kích thước cố định." },
  { id: "06_notes", text: "Video phải công khai hoặc mở cho ai có liên kết. Theo Cường IT, Drive giới hạn băng thông, đông người xem có thể bị chặn tạm thời. Website bật CSP cần cho phép Drive." },
  { id: "07_outro", text: "Website có lượng truy cập lớn? Bài viết khuyên cân nhắc YouTube, Vimeo hoặc Cloudflare Stream. Đọc đầy đủ trên blog Cường IT. Theo dõi kênh để xem thêm nhé." },
];

generateTopicVoices("EmbedGoogleDriveVideo", scenes).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
