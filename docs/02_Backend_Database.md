# Step 2: Backend & Database Setup

## 1. Node.js 서버 환경 (Express)
- `npm init` 및 `express`, `dotenv`, `cors`, `@supabase/supabase-js` 설치.
- 기본 서버 엔드포인트 구조 생성 (`app.js` 또는 `server.js`).

## 2. Supabase 초기화
- 프로젝트 대시보드에서 `sentiment_logs` 테이블 생성.
  - `id` (uuid), `content` (text), `sentiment` (varchar), `confidence` (int), `reasoning` (text), `created_at` (timestamptz).
- 환경 변수(`.env`) 설정: `SUPABASE_URL`, `SUPABASE_ANON_KEY`.

## 3. DB 연동 로직
- 분석 결과를 테이블에 `INSERT`하는 비동기 함수 구현.
