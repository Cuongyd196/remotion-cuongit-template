import { generateTopicVoices } from "./generate-tts";

const scenes = [
  { id: "01_hook", text: "DevOps có phải là tên gọi mới của sysadmin? Cùng làm với máy chủ, nhưng trọng tâm của hai khái niệm này có nhiều điểm khác nhau." },
  { id: "02_context", text: "Một ứng dụng vừa ra mắt đã gặp lỗi. Đội phát triển nói máy tôi vẫn chạy. Đội vận hành cần hệ thống ổn định. Làm sao hai bên phối hợp hiệu quả?" },
  { id: "03_sysadmin", text: "Sysadmin là người quản trị hệ thống: cấu hình máy chủ, quản lý tài khoản, cập nhật bảo mật, sao lưu và khôi phục. Mục tiêu là giữ hạ tầng an toàn, sẵn sàng phục vụ." },
  { id: "04_devops", text: "DevOps là văn hóa và cách làm giúp phát triển phối hợp với vận hành. Nhóm dùng kiểm thử tự động, triển khai liên tục và hạ tầng bằng mã để đưa thay đổi lên an toàn." },
  { id: "05_together", text: "Ví dụ, khi phát hành tính năng, quy trình tự động kiểm thử rồi triển khai. Hệ thống được giám sát; có lỗi thì khôi phục. Sysadmin cũng có thể xây tự động hóa và tham gia DevOps." },
  { id: "06_outro", text: "Vậy sysadmin tập trung quản trị hệ thống; DevOps cải thiện cả dòng chảy phát triển và vận hành. Công việc có thể giao nhau tùy tổ chức. Theo dõi Cường IT để hiểu công nghệ!" },
];

generateTopicVoices("DevOpsSysadmin", scenes).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
