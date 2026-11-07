import { generateTopicVoices } from "./generate-tts";

const scenes = [
  { id: "01_hook", text: "Làm sao biến văn bản tiếng Việt thành giọng nói tự nhiên, ngay trên máy tính của bạn? Giọng bạn đang nghe được tạo bằng chính công cụ này." },
  { id: "02_pain", text: "Bạn cần giọng đọc cho video, nhưng ngại tạo tài khoản và gửi nội dung lên mạng? Với công cụ này, bạn không cần tài khoản, văn bản và giọng nói đều không rời khỏi máy." },
  { id: "03_intro", text: "Đây là CIT Voice Studio, ứng dụng miễn phí cho Windows, Linux và Mac, với gần một trăm năm mươi sao trên GitHub. Tác giả Cường IT xây dựng bộ cài tích hợp sẵn mô hình, rất dễ sử dụng." },
  { id: "04_usage", text: "Bạn tải bộ cài đúng với máy, cài xong dùng được ngay. Sau đó gõ văn bản, chèn thẻ cười hoặc thẻ nghỉ, chọn giọng, rồi tạo âm thanh." },
  { id: "05_features", text: "Bạn có hai mươi lăm giọng Việt cả ba miền, nhân bản giọng từ vài giây thu âm, lồng tiếng khớp mốc thời gian của file phụ đề, và tải thêm mô hình để đọc ba mươi mốt ngôn ngữ." },
  { id: "06_origin", text: "Về mô hình, giọng Việt dùng VieNeu TTS của tác giả Phạm Nguyễn Ngọc Bảo, còn giọng nước ngoài dùng mô hình của Supertone." },
  { id: "07_outro", text: "Rất hợp để làm video, podcast, hoặc gọi API từ phần mềm khác. Nhớ chỉ nhân bản giọng của bạn hoặc giọng đã được cho phép. Theo dõi Cường IT nhé!" },
];

generateTopicVoices("CitVoiceStudioRepo", scenes).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
