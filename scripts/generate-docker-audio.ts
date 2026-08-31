import { generateTopicVoices } from "./generate-tts";

const dockerScenes = [
  {
    id: "scene1_hook",
    text: "Bạn có biết Docker thực chất là gì và tại sao mọi lập trình viên đều bắt buộc phải biết nó không?",
  },
  {
    id: "scene2_problem",
    text: "Trước đây, câu nói 'trên máy tôi vẫn chạy được' luôn là cơn ác mộng khi bàn giao code giữa các môi trường khác nhau.",
  },
  {
    id: "scene3_container",
    text: "Docker giải quyết triệt để vấn đề này bằng Container: đóng gói code, thư viện và môi trường vào một khối độc lập siêu nhẹ.",
  },
  {
    id: "scene4_image_dockerfile",
    text: "Chỉ với một file Dockerfile đơn giản, bạn tạo ra Docker Image và có thể nhân bản hàng nghìn Container giống hệt nhau trong tích tắc.",
  },
  {
    id: "scene5_benefits",
    text: "Nhẹ hơn máy ảo gấp 10 lần, tiết kiệm tài nguyên và dễ dàng deploy lên bất kỳ hệ thống đám mây nào như AWS hay GCP.",
  },
  {
    id: "scene6_outro",
    text: "Nắm vững Docker ngay hôm nay để tự tin triển khai mọi dự án. Nhớ thả tim và follow kênh để đón xem video tiếp theo nhé!",
  },
];

async function main() {
  await generateTopicVoices("DockerExplainer", dockerScenes);
}

main().catch(console.error);
