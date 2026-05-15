# Sentimental AI (감성 분석 서비스)

Apple Aesthetic 디자인 시스템을 적용한 AI 기반 감성 분석 웹 서비스입니다. 
OpenAI의 강력한 언어 모델을 통해 텍스트의 감정 상태를 분석하고, 그 결과를 고급스러운 UI로 제공합니다.

## ✨ 주요 기능
- **AI 감성 분석**: OpenAI API(gpt-4o)를 활용한 정밀한 감정 분석 (긍정/부정/중립).
- **고급스러운 UI**: Apple 디자인 가이드라인을 준수한 미니멀하고 세련된 인터페이스.
- **데이터 보안**: 사용자의 입력 텍스트를 AES-256 방식으로 암호화하여 Supabase DB에 저장.
- **반응형 디자인**: 모바일과 데스크탑 환경 모두 최적화된 레이아웃 제공.

## 🛠️ 기술 스택
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Node.js (Express)
- **AI**: OpenAI API
- **Database**: Supabase
- **Deployment**: Vercel

## 🚀 시작하기

### 1. 필수 설정 (.env)
루트 디렉토리에 `.env` 파일을 생성하고 아래 정보를 입력합니다.
```env
OPENAI_API_KEY=여러분의_OpenAI_API_키
SUPABASE_URL=여러분의_Supabase_URL
SUPABASE_ANON_KEY=여러분의_Supabase_익명_키
ENCRYPTION_KEY=32자_암호화_키 (예: a_very_secret_key_32_chars_long!!)
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 서버 실행
```bash
npm start
```
이후 브라우저에서 `http://localhost:3000`에 접속하세요.

## 📁 폴더 구조
- `public/`: HTML, CSS, JavaScript (프론트엔드)
- `server/`: 서버 로직 및 API 구현 (백엔드)
- `supabase/`: DB 테이블 생성 쿼리 (마이그레이션)
- `review_insight/`: 코드 검토를 위해 백업된 파일 폴더

## 🔒 보안 규칙
이 프로젝트는 사용자의 개인정보 보호를 최우선으로 합니다. 
- 데이터베이스에 저장되는 텍스트는 모두 암호화되어 저장됩니다.
- API 키는 클라이언트(프론트엔드)에 노출되지 않으며 오직 서버 환경 변수를 통해서만 접근합니다.
