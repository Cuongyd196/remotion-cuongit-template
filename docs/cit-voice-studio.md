# CIT Voice Studio - Hướng Dẫn Kết Nối API & Tích Hợp AI Agent

> **Phiên bản API**: `1.0.0`  
> **Địa chỉ mặc định**: `http://127.0.0.1:8001` (hoặc `http://localhost:8001`)  
> **Mục đích tài liệu**: Cung cấp đặc tả API đầy đủ, chính xác, kèm mã nguồn mẫu để **AI Agent** (Cursor, Claude, ChatGPT, LangChain, AutoGen, CrewAI, Open WebUI, Dify...) hoặc lập trình viên có thể đọc hiểu và tích hợp ngay lập tức mà không cần tài liệu bổ sung.

---

## 1. Tổng Quan Hệ Thống

**CIT Voice Studio** là nền tảng AI tổng hợp giọng nói tiếng Việt chất lượng phòng thu (Offline & On-Device), hỗ trợ:
- **Text-to-Speech (TTS)** thời gian thực với độ trễ cực thấp (TTFA ~100-300ms) qua giao thức Chunked Streaming.
- **Tần số lấy mẫu (Sample Rate)**: 48 kHz (VieNeu-TTS v3 Turbo), 24 kHz (VieNeu-TTS v3 Nano) hoặc 44,1 kHz (Supertonic 3). Luôn đọc tần số thật từ `GET /health` hoặc header `X-Sample-Rate`, đừng gắn cứng: phát PCM của `/stream` sai tần số sẽ nghe nhanh/chậm và lệch giọng.
- **Giọng nước ngoài (từ 1.0.3)**: mô hình tải thêm **Supertonic 3** đọc 31 ngôn ngữ (Anh, Nhật, Hàn, Pháp, Đức…) bằng 10 giọng `F1`-`F5`, `M1`-`M5`. Chọn ngôn ngữ qua tham số `language` (mục 3).
- **Thẻ cảm xúc (Emotion Tags)**: `[cười]`, `[hắng giọng]`, `[thở dài]`.
- **Zero-shot Voice Cloning**: Nhân bản giọng nói chỉ với một đoạn audio mẫu ngắn (≤ 8 giây).
- **Hội thoại & Podcast đa nhân vật**: Ghép nối tự động các lượt thoại giữa nhiều nhân vật khác nhau.
- **Thẻ nghỉ `[nghỉ 2s]`**: Chèn khoảng lặng có độ dài chính xác, dùng được với mọi model.
- **Từ điển phát âm**: Cách đọc từ viết tắt / tên riêng người dùng đặt trong ứng dụng (`KTX` → "ký túc xá") được áp dụng tự động cho mọi API đọc văn bản.
- **Phụ đề SRT**: Tạo audio kèm phụ đề có mốc thời gian theo từng câu, dùng để dựng video.
- **CORS**: Đã kích hoạt `Allow-Origins: *` cho toàn bộ endpoint, tương thích hoàn toàn với trình duyệt web và desktop app.
- **Gọi từ máy khác (LAN)**: Mặc định chỉ máy chạy ứng dụng gọi được. Bật trong Cài đặt thì máy khác gọi được các API ở mục 4, bắt buộc kèm khoá API (xem mục 4.0).

---

## 2. Giọng Đọc Có Sẵn (Studio Presets)

Danh sách chính xác luôn lấy từ `GET /voices` (gồm cả giọng nhân bản người dùng đã lưu). `voice_id` là **tên giọng**, phân biệt dấu.

### Model VieNeu-TTS v3 Turbo (mặc định, 48 kHz) - 25 giọng

| ID / Tên giọng | Giới tính | Miền | Phong cách |
| :--- | :--- | :--- | :--- |
| `Hải Đăng` *(mặc định)* | Nam | Bắc | Tự nhiên |
| `Adam bựa` | Nam | Bắc | Tự nhiên |
| `Trúc Ly` | Nữ | Bắc | Tự nhiên |
| `Thiện Minh` | Nam | Bắc | Kể chuyện |
| `Mai Anh` | Nữ | Bắc | Tin tức |
| `Thùy Dung` | Nữ | Nam | Tin tức |
| `Thiền Tâm Đức` | Nam | Bắc | Kể chuyện |
| `Ngọc Huyền` | Nữ | Bắc | Tự nhiên |
| `Quang Sơn` | Nam | Trung | Tự nhiên |
| `Ngọc Trân` | Nữ | Trung | Tự nhiên |
| `Minh Đức` | Nam | Bắc | Tin tức |
| `Phạm Tuyên` | Nam | Bắc | Tự nhiên |
| `Thái Sơn` | Nam | Nam | Kể chuyện |
| `Xuân Vĩnh` | Nam | Bắc | Tự nhiên |
| `Thanh Bình` | Nam | Bắc | Kể chuyện |
| `Ngọc Linh` | Nữ | Bắc | Kể chuyện |
| `Đoan Trang` | Nữ | Bắc | Tự nhiên |
| `Thục Đoan` | Nữ | Nam | Kể chuyện |
| `Minh Triết` | Nam | Nam | Tin tức |
| `Mỹ Duyên` | Nữ | Nam | Đọc truyện |
| `Quỳnh Anh` | Nữ | Bắc | Đọc truyện |
| `Đức Trí` | Nam | Nam | Đọc truyện |
| `Kim Thanh` | Nữ | Nam | Đọc truyện |
| `Adam` | Nam | Nam | Tự nhiên |
| `Quốc Tuấn` | Nam | Bắc | Tự nhiên |

Tên cũ vẫn gọi được và tự chuyển sang giọng mới: `Minh Quân`, `Minh Quân Pro` → `Hải Đăng`; `Anh Khôi` → `Thiện Minh`; `Mạnh Dũng` → `Quốc Tuấn`.

### Model VieNeu-TTS v3 Nano (24 kHz) - 11 giọng

`Minh Quân` *(mặc định)*, `Anh Khôi`, `Mạnh Dũng`, `Hữu Quân`, `Đức Trí`, `Adam` (nam) · `Trúc Ly`, `Mai Anh`, `Xuân Tiên`, `Ái Hân`, `Mỹ Duyên` (nữ).

### Model Supertonic 3 (44,1 kHz, giọng nước ngoài) - 10 giọng

`F1` *(mặc định)*, `F2`, `F3`, `F4`, `F5` (nữ) · `M1`, `M2`, `M3`, `M4`, `M5` (nam). Giọng nào cũng đọc được mọi ngôn ngữ của model. Model này **không nhân bản giọng**. Người dùng phải tải nó trong ứng dụng (mục Mô hình) rồi chuyển sang; khi đó các giọng VieNeu ở trên trả lỗi `400`.

Bỏ trống `voice_id` thì máy chủ dùng giọng mặc định của model đang chạy - cũng là giọng **đứng đầu** danh sách `GET /voices`. `voice_id` không có trong model đang chạy → lỗi `400` (báo ngay, trước khi đọc; ở `/api/tts/conversation` lỗi nêu tên người nói của lượt sai).

---

## 3. Quy Ước Văn Bản Đầu Vào

### Ngôn ngữ (`language`) - chỉ với model đọc nhiều ngôn ngữ

Các endpoint đọc văn bản (`/stream`, `/api/tts/generate`, `/api/tts/generate-with-subtitles`, `/api/tts/conversation`) nhận thêm `language` *(string, tuỳ chọn)*: mã ngôn ngữ như `"en"`, `"ja"`, `"ko"`, `"fr"`, `"de"`, `"vi"`… Danh sách mã của model đang chạy nằm trong `languages` của `GET /health` (rỗng với VieNeu).

- Bỏ trống: model tự nhận theo chữ - có dấu tiếng Việt → `vi`, chữ Nhật → `ja`, chữ Hàn → `ko`, còn lại `en`.
- Model VieNeu (chỉ tiếng Việt xen tiếng Anh) **bỏ qua** tham số này, nên phần mềm luôn gửi `language` vẫn chạy bình thường khi người dùng đổi model.
- Mã không có trong danh sách của model đang chạy → lỗi `400`.
- Tiếng Việt cho chất lượng tốt nhất trên VieNeu; Supertonic dùng cho văn bản tiếng nước ngoài.

### Thẻ cảm xúc

Hỗ trợ trên model **VieNeu-TTS-v3-Turbo**. Supertonic 3 dùng thẻ riêng `<laugh>` (cười), `<breath>` (lấy hơi), `<sigh>` (thở dài); nó cũng nhận `[cười]`, `[thở dài]`, `[lấy hơi]` và bỏ qua `[hắng giọng]`. Thẻ cảm xúc không hiện trong phụ đề SRT:
- `[cười]`: Thêm biểu cảm vui tươi, tiếng cười tự nhiên.
- `[hắng giọng]`: Thêm động tác hắng giọng, chuẩn bị nói hoặc ngắt nhịp trịnh trọng.
- `[thở dài]`: Thêm hơi thở dài, trầm ngâm hoặc thất vọng nhẹ.

*Ví dụ văn bản*: `"Xin chào cả nhà! Hôm nay tôi có tin rất vui. [cười] Dự án đã hoàn thành! [thở dài] Nhưng thật sự cũng khá vất vả."`

### Thẻ nghỉ `[nghỉ 2s]` - khoảng lặng có độ dài chính xác

Dùng được với **mọi model** và mọi endpoint đọc văn bản (`/stream`, `/api/tts/generate`, `/api/tts/generate-with-subtitles`, `/api/tts/conversation` - trong từng lượt thoại). Máy chủ tách văn bản tại thẻ, đọc từng đoạn rồi chèn đúng số giây im lặng; thẻ không bao giờ bị đọc thành tiếng.

- Cú pháp: `[nghỉ 2s]`, `[nghỉ 1.5s]`, `[nghỉ 1,5 giây]`, `[nghỉ 500ms]`, `[pause 2s]`, `[nghi 2]` (không ghi đơn vị = giây), `[nghỉ]` = 1 giây.
- Tối đa **10 giây** mỗi thẻ; hai thẻ liền nhau được cộng dồn. Thẻ viết sai (`[nghỉ abc]`) bị bỏ qua.
- Tham số `speed` chỉ đổi tốc độ giọng nói, không kéo giãn khoảng nghỉ.
- Văn bản chỉ có thẻ nghỉ mà không có chữ → lỗi `400`.
- Đoạn đứng trước thẻ được đọc như một câu riêng - đoạn quá ngắn (1–2 từ) có thể nghe hơi cụt.

*Ví dụ*: `"AI tạo sinh [nghỉ 2s] đang thay đổi mọi ngành."`

### Từ điển phát âm

Người dùng đặt cách đọc từ viết tắt / tên riêng ngay trong ứng dụng (nút **Từ điển** ở khung soạn thảo), ví dụ `KTX` → "ký túc xá". Máy chủ tự áp dụng cho `/stream`, `/api/tts/generate`, `/api/tts/generate-with-subtitles`, `/api/tts/conversation` - phần mềm gọi API không cần gửi thêm gì. Chỉ thay nguyên từ, mặc định phân biệt hoa/thường. Từ điển áp dụng cho **mọi model**, kể cả Supertonic 3 (ví dụ `CIT` → `C I T`, `Nguyễn` → `Nwin` khi đọc tiếng Anh); dùng chung một bộ cho mọi ngôn ngữ.

---

## 4. Chi Tiết Các Endpoint API

### 4.0. Xác Thực - Chỉ Khi Gọi Từ Máy Khác

- **Cùng máy** với ứng dụng (`127.0.0.1` / `localhost`): **không cần khoá**, gọi thẳng như các ví dụ bên dưới.
- **Máy khác trong mạng LAN**: trên máy chạy ứng dụng, mở **Cài đặt → Cho máy khác truy cập API**, bật lên rồi **đóng và mở lại ứng dụng** (lần đầu Windows hỏi quyền tường lửa: chọn *Cho phép* với mạng *Riêng tư*). Cài đặt hiện địa chỉ (`http://192.168.x.x:8001`) và khoá API.
- Gửi khoá qua header `X-API-Key: <khoá>` hoặc `Authorization: Bearer <khoá>`. Riêng thẻ `<audio src="...">` không gửi được header thì thêm `&api_key=<khoá>` vào URL `GET /stream`.
- Qua proxy / đường hầm (ngrok, Cloudflare Tunnel, nginx...) cũng bị coi là máy khác và cần khoá, kể cả khi proxy chạy trên cùng máy.
- Máy khác **chỉ** gọi được các API trong mục 4 và tài liệu (`/docs`, `/openapi.json`, `/cit-voice-studio.md`). Mọi đường dẫn khác trả `404`.
- Thử API trên trang `/docs` (Swagger) từ máy khác: bấm nút **Authorize**, dán khoá vào ô `ApiKey`.
- Khoá đi qua HTTP không mã hoá: chỉ dùng trong mạng tin cậy. Muốn đưa ra Internet, dùng đường hầm HTTPS thay vì mở cổng router.

```bash
curl.exe -H "X-API-Key: cit_xxxxxxxx" http://192.168.1.5:8001/health
```

Tài liệu này chỉ liệt kê các API dành cho **phần mềm khác gọi vào để tạo giọng nói**. Các API còn lại (lịch sử, quản lý mô hình, cài đặt, từ điển phát âm, lưu giọng nhân bản, đọc file...) phục vụ riêng giao diện của CIT Voice Studio, có thể thay đổi giữa các phiên bản và không nên dùng từ bên ngoài.

### 4.1. Kiểm Tra Trạng Thái Máy Chủ - `GET /health`
Kiểm tra kết nối, trạng thái tải mô hình, thiết bị phần cứng (CPU/GPU) và tần số lấy mẫu.

- **URL**: `http://127.0.0.1:8001/health`
- **Method**: `GET`
- **Response `200 OK` (JSON)**:
```json
{
  "status": "ok",
  "engine": "VieNeu-TTS-v3-Turbo (int8)",
  "sample_rate": 48000,
  "precision": "int8",
  "device": "cpu",
  "backend": "onnx",
  "message": "Sẵn sàng",
  "languages": [],
  "supports_cloning": true
}
```

`languages`: các mã dùng được cho tham số `language` (vd. `[{"code": "en", "name": "Tiếng Anh"}, …]` khi đang chạy Supertonic 3), rỗng với VieNeu. `supports_cloning`: model đang chạy có dùng được giọng nhân bản không.

---

### 4.2. Danh Sách Giọng Đọc - `GET /voices`
Trả về toàn bộ giọng có sẵn (bao gồm giọng mặc định và giọng tuỳ chỉnh đã clone).

- **URL**: `http://127.0.0.1:8001/voices`
- **Method**: `GET`
- **Response `200 OK` (JSON Array)**:
```json
[
  {
    "id": "Minh Đức",
    "name": "Minh Đức",
    "gender": "male",
    "region": "North",
    "description": "Nam · Bắc · Phong cách tin tức · 48 kHz",
    "isCloned": false
  }
]
```

---

### 4.3. Streaming TTS Thời Gian Thực - `GET /stream` hoặc `POST /stream`
Phương thức tối ưu nhất cho chatbot, trợ lý ảo và ứng dụng tương tác thoại.
Trả về luồng âm thanh dạng **WAV chunked**: 44 bytes đầu tiên là WAV header, các chunk tiếp theo là dữ liệu PCM16 phát ra tức thì khi GPU/CPU vừa tính toán xong.

#### A. Gọi qua `GET`:
- **URL**: `http://127.0.0.1:8001/stream?text=Xin+chào&voice_id=Minh+Đức`
- **Query Parameters**:
  - `text` *(string, bắt buộc)*: Nội dung cần đọc.
  - `voice_id` *(string, tuỳ chọn)*: Tên giọng (bỏ trống = giọng mặc định của model, xem mục 2).
- **Response**: `audio/wav` (Streaming chunks)

#### B. Gọi qua `POST`:
- **URL**: `http://127.0.0.1:8001/stream`
- **Headers**: `Content-Type: application/json`
- **Request Body (JSON)**:
```json
{
  "text": "Xin chào các bạn, đây là luồng âm thanh thời gian thực.",
  "voice_id": "Minh Đức"
}
```

---

### 4.4. Tạo Audio Hoàn Chỉnh - `POST /api/tts/generate`
Tạo file âm thanh hoàn chỉnh với các thông số tuỳ biến chuyên sâu (tốc độ, độ dừng nghỉ, ngẫu nhiên hóa).

- **URL**: `http://127.0.0.1:8001/api/tts/generate`
- **Headers**: `Content-Type: application/json`
- **Request Body (JSON)**:
```json
{
  "text": "CIT Voice Studio mang đến giọng nói nhân tạo đỉnh cao.",
  "voice_id": "Mai Anh",
  "speed": 1.0,
  "temperature": 0.7,
  "silence_duration": 0.2,
  "format": "wav",
  "use_pronunciation_dict": true
}
```
*Ghi chú tham số*:
- `speed` *(float, mặc định 1.0)*: Tốc độ đọc từ `0.5` đến `2.0`. Chỉ đổi tốc độ giọng nói, không kéo giãn thẻ `[nghỉ Ns]`.
- `temperature` *(float, mặc định 0.7)*: Độ biểu cảm, ngẫu nhiên âm điệu (`0.1` đến `1.2`).
- `silence_duration` *(float, mặc định 0.2)*: Được nhận nhưng **hiện chưa có tác dụng** ở endpoint này. Muốn chèn khoảng nghỉ, dùng thẻ `[nghỉ 2s]` trong `text`.
- `format` *(string, mặc định "wav")*: `"wav"` hoặc `"mp3"`.
- `use_pronunciation_dict` *(bool, mặc định true)*: Áp dụng từ điển phát âm người dùng đặt trong ứng dụng (xem mục 3). Đặt `false` nếu phần mềm của bạn đã tự thay từ viết tắt trước khi gửi - thay hai lần có thể đọc sai.
- `seed` *(int, tuỳ chọn)*: Cố định độ ngẫu nhiên - cùng `text`, `voice_id`, `seed` (và cùng model, máy) cho ra **cùng một file audio**. Bỏ trống (mặc định) thì mỗi lần đọc hơi khác nhau, tự nhiên hơn. Cũng nhận ở `/api/tts/generate-with-subtitles` và `/api/tts/conversation`.

> **Tạo hàng loạt**: không có endpoint riêng. Gọi `/api/tts/generate` lần lượt cho từng mục (máy chủ xử lý một yêu cầu một lúc, gọi song song không nhanh hơn). Tab "Tạo hàng loạt" trong ứng dụng làm đúng như vậy.

- **Response Headers**:
  - `X-Duration-Seconds`: Thời lượng audio (giây).
  - `X-Elapsed-Seconds`: Thời gian AI tạo audio (giây).
  - `X-RTF`: Real-Time Factor (nhỏ hơn 1 nghĩa là nhanh hơn thời gian thực).
  - `X-Sample-Rate`: Tần số âm thanh (48000 hoặc 24000).
- **Response Body**: Dữ liệu binary của file audio (`audio/wav` hoặc `audio/mpeg`).

---

### 4.5. Tạo Audio Kèm Phụ Đề SRT - `POST /api/tts/generate-with-subtitles`
Giống `/api/tts/generate` (cùng request body), nhưng trả **JSON** gồm audio + phụ đề `.srt` để dựng video.

Máy chủ đọc theo **từng câu** (gộp câu quá ngắn) và đo độ dài audio thật của mỗi câu, nên mốc thời gian chính xác tới mức câu. Phụ đề hiện **văn bản gốc** (chữ `KTX` chứ không phải cách đọc "ký túc xá" của từ điển), bỏ thẻ cảm xúc và thẻ nghỉ; câu dài được chia thành nhiều dòng phụ đề (tối đa 2 dòng × ~42 ký tự).

- **Response `200 OK` (JSON)**:
```json
{
  "audio_base64": "UklGRi...",
  "format": "wav",
  "sample_rate": 48000,
  "duration_seconds": 4.21,
  "elapsed_seconds": 2.05,
  "rtf": 0.487,
  "srt": "1\n00:00:00,000 --> 00:00:02,180\nHọc sinh nhận SGK tại KTX.\n",
  "cues": [{ "start": 0.0, "end": 2.18, "text": "Học sinh nhận SGK tại KTX." }]
}
```
*Ghi chú*: `audio_base64` là nội dung file WAV/MP3 mã hoá base64. Lưu `srt` thành file `.srt` **cùng tên** với file audio để phần mềm dựng video tự ghép. Chậm hơn `/api/tts/generate` một chút vì đọc từng câu riêng.

---

### 4.6. Dùng giọng nhân bản
Từ bản 1.0.2, API **không còn nhận file giọng mẫu** (`POST /api/tts/clone` đã bỏ).
Giọng nhân bản chỉ tạo được trong ứng dụng, tab **Nhân bản giọng**: người dùng thu âm
trực tiếp và đọc câu đồng ý, ứng dụng kiểm tra rồi mới lưu. Sau đó mọi endpoint đọc
văn bản dùng được giọng đó qua `voice_id` (tên giọng, xem `GET /voices`).

---

### 4.7. Tạo Podcast & Hội Thoại Đa Nhân Vật - `POST /api/tts/conversation`
Tự động phối hợp nhiều người nói khác nhau theo từng câu thoại và ghép thành một file podcast duy nhất.

- **URL**: `http://127.0.0.1:8001/api/tts/conversation`
- **Headers**: `Content-Type: application/json`
- **Request Body (JSON)**:
```json
{
  "turns": [
    {
      "speaker": "MC",
      "text": "Chào mừng quý vị đến với CIT Voice Studio Podcast!",
      "voice_id": "Minh Đức"
    },
    {
      "speaker": "Khách mời",
      "text": "Rất vui được có mặt trong chương trình ngày hôm nay.",
      "voice_id": "Trúc Ly"
    }
  ],
  "silence_duration": 0.4,
  "speed": 1.0,
  "format": "wav"
}
```
- `seed` *(int, tuỳ chọn)*: Như ở mục 4.4.
- **Response**: File âm thanh hoàn chỉnh ghép nối toàn bộ buổi hội thoại.

---

## 5. Hướng Dẫn Tích Hợp Cho Lập Trình Viên & AI Agent

### 5.1. Ví Dụ cURL Cơ Bản

#### Tạo giọng nói và lưu ra file `speech.wav`:
```bash
curl -X POST "http://127.0.0.1:8001/api/tts/generate" \
     -H "Content-Type: application/json" \
     -d '{"text": "Xin chào! Đây là giọng đọc từ CIT Voice Studio.", "voice_id": "Minh Đức"}' \
     --output speech.wav
```

#### Nghe stream trực tiếp:
```bash
curl "http://127.0.0.1:8001/stream?text=Xin+chào&voice_id=Mai+Anh" | ffplay -nodisp -autoexit -
```

#### Gọi từ máy khác trong mạng LAN (cần khoá - xem mục 4.0):
Thay IP và khoá bằng giá trị hiện trong **Cài đặt → Cho máy khác truy cập API**.

*cmd* của Windows (chạy `chcp 65001` trước để gửi đúng chữ có dấu; Linux/macOS dùng `curl` thay cho `curl.exe`):
```bash
curl.exe -X POST "http://192.168.1.5:8001/api/tts/generate" -H "X-API-Key: cit_xxxxxxxx" -H "Content-Type: application/json" -d "{\"text\": \"Xin chào từ máy khác\", \"voice_id\": \"Minh Đức\"}" --output speech.wav
```

*PowerShell* (gửi nội dung dạng UTF-8 để giữ dấu tiếng Việt):
```powershell
Invoke-WebRequest -Uri "http://192.168.1.5:8001/api/tts/generate" -Method Post -Headers @{ "X-API-Key" = "cit_xxxxxxxx" } -ContentType "application/json; charset=utf-8" -Body ([Text.Encoding]::UTF8.GetBytes('{"text": "Xin chào từ máy khác", "voice_id": "Minh Đức"}')) -OutFile speech.wav
```

---

### 5.2. Mã Nguồn Mẫu Python Client Đầy Đủ

```python
import requests
import json
from pathlib import Path

class CitVoiceStudio:
    def __init__(self, base_url: str = "http://127.0.0.1:8001", api_key: str | None = None):
        """api_key: chỉ cần khi gọi từ máy khác (lấy trong Cài đặt của ứng dụng)."""
        self.base_url = base_url.rstrip("/")
        self.http = requests.Session()
        if api_key:
            self.http.headers["X-API-Key"] = api_key

    def check_health(self) -> dict:
        """Kiểm tra máy chủ và model hiện hành."""
        res = self.http.get(f"{self.base_url}/health", timeout=5)
        res.raise_for_status()
        return res.json()

    def get_voices(self) -> list:
        """Lấy danh sách tất cả các giọng đọc."""
        res = self.http.get(f"{self.base_url}/voices", timeout=5)
        res.raise_for_status()
        return res.json()

    def speak(self, text: str, voice_id: str = "Minh Đức", speed: float = 1.0, out_path: str = "output.wav") -> str:
        """Tạo file giọng nói hoàn chỉnh."""
        payload = {
            "text": text,
            "voice_id": voice_id,
            "speed": speed,
            "format": "wav"
        }
        res = self.http.post(f"{self.base_url}/api/tts/generate", json=payload, timeout=60)
        res.raise_for_status()
        Path(out_path).write_bytes(res.content)
        print(f"✅ Đã lưu: {out_path} (RTF: {res.headers.get('X-RTF')})")
        return out_path

# --- Sử dụng ---
if __name__ == "__main__":
    client = CitVoiceStudio()  # cùng máy: không cần khoá
    # Máy khác: client = CitVoiceStudio("http://192.168.1.5:8001", api_key="cit_xxxxxxxx")
    print("Health:", client.check_health())
    client.speak("Xin chào các bạn, CIT Voice Studio đã sẵn sàng phục vụ!", voice_id="Minh Đức")
```

---

### 5.3. Mã Nguồn Mẫu JavaScript / TypeScript (Node.js hoặc Browser)

```typescript
export class CitVoiceStudioClient {
  /** apiKey: chỉ cần khi gọi từ máy khác (lấy trong Cài đặt của ứng dụng). */
  constructor(
    private baseUrl: string = "http://127.0.0.1:8001",
    private apiKey?: string
  ) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  private headers(extra: Record<string, string> = {}): Record<string, string> {
    return this.apiKey ? { ...extra, "X-API-Key": this.apiKey } : extra;
  }

  async getVoices() {
    const res = await fetch(`${this.baseUrl}/voices`, { headers: this.headers() });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  }

  async generateSpeech(text: string, voiceId: string = "Minh Đức", speed: number = 1.0): Promise<Blob> {
    const res = await fetch(`${this.baseUrl}/api/tts/generate`, {
      method: "POST",
      headers: this.headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        text,
        voice_id: voiceId,
        speed,
        format: "wav",
      }),
    });
    if (!res.ok) throw new Error(`Tạo giọng thất bại: ${res.statusText}`);
    return await res.blob();
  }

  /** Dùng cho <audio src>: thẻ này không gửi được header nên khoá đi qua URL. */
  getStreamUrl(text: string, voiceId: string = "Minh Đức"): string {
    const params = new URLSearchParams({ text, voice_id: voiceId });
    if (this.apiKey) params.set("api_key", this.apiKey);
    return `${this.baseUrl}/stream?${params.toString()}`;
  }
}
```

---

### 5.4. Tích Hợp Vào Các Framework AI Agent (LangChain / Dify / Function Calling)

Định dạng JSON Schema chuẩn cho các mô hình ngôn ngữ lớn (OpenAI / Gemini / Anthropic Tool Calling):

```json
{
  "name": "generate_vietnamese_speech",
  "description": "Chuyển đổi văn bản tiếng Việt thành giọng nói tự nhiên thông qua CIT Voice Studio local API.",
  "parameters": {
    "type": "object",
    "properties": {
      "text": {
        "type": "string",
        "description": "Đoạn văn bản tiếng Việt cần đọc. Có thể chèn tag cảm xúc như [cười], [hắng giọng], [thở dài]."
      },
      "voice_id": {
        "type": "string",
        "description": "Tên giọng đọc (ví dụ: 'Minh Đức', 'Mai Anh', 'Thái Sơn', 'Trúc Ly'). Mặc định là 'Minh Đức'."
      },
      "speed": {
        "type": "number",
        "description": "Tốc độ nói từ 0.75 đến 1.5, mặc định 1.0."
      }
    },
    "required": ["text"]
  }
}
```

---

## 6. Xử Lý Lỗi Thường Gặp (Troubleshooting)

1. **Lỗi `503 Model not loaded`**:
   - *Nguyên nhân*: Server vừa bật hoặc đang tải model.
   - *Cách khắc phục*: Gọi `GET /health` đợi cho tới khi `"status": "ok"` rồi tiếp tục gửi request TTS.

2. **Lỗi `400 Voice '...' not found`**:
   - *Nguyên nhân*: Tên giọng đọc truyền vào không khớp với danh sách trả về từ `GET /voices`.
   - *Cách khắc phục*: Gọi `GET /voices` để lấy đúng danh sách tên chuẩn (hỗ trợ Unicode tiếng Việt có dấu).

3. **Lỗi kết nối `Failed to fetch` hoặc `Connection Refused`**:
   - *Nguyên nhân*: Ứng dụng CIT Voice Studio chưa mở hoặc backend đang chạy ở cổng khác.
   - *Cách khắc phục*: Kiểm tra ứng dụng đang mở, mở `http://127.0.0.1:8001/health` để xác minh cổng hoạt động. Gọi từ máy khác mà bị từ chối kết nối: kiểm tra đã bật truy cập từ máy khác, đã mở lại ứng dụng, và tường lửa Windows cho phép ứng dụng.

4. **Lỗi `401` / `403` / `404` khi gọi từ máy khác** (xem mục 4.0):
   - `401`: thiếu hoặc sai khoá API - lấy lại khoá trong Cài đặt (khoá đổi khi bấm *Khoá mới*).
   - `403`: tính năng cho máy khác truy cập đang tắt.
   - `404`: đường dẫn không nằm trong danh sách API công khai.

---

*Tài liệu được cập nhật tự động đồng bộ theo CIT Voice Studio 1.0.1.*
