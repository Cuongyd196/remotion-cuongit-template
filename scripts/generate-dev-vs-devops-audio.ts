import { generateTopicVoices } from "./generate-tts";

const scenes = [
  { id: "01_hook", text: "Mới vào nghề công nghệ, nên làm Dev hay DevOps? Hai hướng này không đối đầu nhau, mà cùng làm việc để đưa phần mềm đến người dùng. Cùng xem khác nhau ở đâu nhé." },
  { id: "02_core", text: "Khác biệt lớn nhất là trọng tâm. Dev tập trung tạo ra phần mềm. DevOps tập trung đưa phần mềm lên chạy nhanh và ổn định, bằng tự động hóa và hạ tầng." },
  { id: "03_a", text: "Dev là người thiết kế, viết và kiểm thử phần mềm, thường làm theo nhóm. Việc chính là biến yêu cầu thành tính năng. Thách thức là giao đúng hạn, đúng chi phí và ít lỗi." },
  { id: "04_b", text: "DevOps vốn là văn hóa làm việc, nhưng nhiều công ty tuyển vị trí DevOps Engineer. Việc chính là phát hành, hạ tầng và tự động hóa. Thách thức là kỹ năng phải trải rộng cả hai phía." },
  { id: "05_versus", text: "Về trọng tâm, Dev tạo ra phần mềm, DevOps lo phát hành và vận hành. Về việc chính, Dev thiết kế và viết code, DevOps làm hạ tầng và tự động hóa. Về kỹ năng, Dev cần lập trình và kiểm thử, DevOps cần cả code lẫn vận hành." },
  { id: "06_verdict", text: "Chọn Dev khi bạn thích viết code và xây tính năng. Chọn DevOps khi bạn thích hạ tầng, tự động hóa và giữ hệ thống ổn định. Theo dõi Cường IT để xem thêm so sánh nhé!" },
];

generateTopicVoices("DevVsDevops", scenes).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
