# DevOps và sysadmin

Composition `DevOpsSysadmin`, 1080×1920, 30 fps, khoảng 50 giây. Sáu cảnh, thuyết minh CIT Voice Studio theo cấu hình `.env`, phụ đề một dòng theo cụm sáu từ.

Audio được phát nguyên tốc độ (`playbackRate={1}`). Mỗi cảnh có ba frame đệm sau lời đọc; cảnh cuối giữ thêm 40 frame để đọc lời kêu gọi. Phụ đề chia đều theo thời lượng lời đọc, không phải timestamp từng từ.

```sh
npx tsx scripts/generate-devops-sysadmin-audio.ts
npm run lint
npx remotion render DevOpsSysadmin out/DevOpsSysadmin.mp4
```

Script dùng lại file giọng đọc đã có. Khi đổi văn bản hoặc cấu hình giọng, cần bỏ file cache tương ứng trong `public/audio/DevOpsSysadmin` trước khi tạo lại.

Tham khảo nội dung: https://aws.amazon.com/devops/what-is-devops/ và https://learn.microsoft.com/en-us/devops/what-is-devops . DevOps là văn hóa và tập hợp thực hành; phạm vi công việc sysadmin và DevOps engineer thay đổi tùy tổ chức. Sysadmin có thể tự động hóa, DevOps vẫn quan tâm độ ổn định và bảo mật.
