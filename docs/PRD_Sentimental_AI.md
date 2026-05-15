# PRD: Sentimental AI (감성 분석 서비스)

**버전:** 1.0  
**상태:** Draft (Coding Agent Ready)  
**디자인 시스템:** Apple Aesthetic (Reverent, Minimalist, Typography-first)

---

## 1. 제품 개요 (Product Overview)
**Sentimental AI**는 사용자가 입력한 텍스트의 감정 상태를 인공지능(OpenAI)을 통해 분석하고, 그 결과를 Apple 특유의 절제되고 고급스러운 UI로 제공하는 웹 서비스입니다. 
- **목표:** "UI는 사라지고 콘텐츠만 남는다"는 원칙하에, 복잡한 설정 없이 텍스트 입력과 분석 결과에만 집중할 수 있는 사용자 경험 제공.

## 2. 주요 기능 (Key Features)
1. **텍스트 입력:** 사용자가 감성 분석을 원하는 문장을 자유롭게 입력.
2. **AI 감성 분석:** OpenAI API를 활용하여 텍스트의 감정(긍정/부정/중립) 판별.
3. **신뢰도 산출:** 분석 결과에 대한 신뢰도를 백분율(%)로 계산.
4. **분석 이유 제공:** 왜 해당 감정으로 분석했는지에 대한 2~3문장의 짧은 설명 제공.
5. **결과 모달:** Apple 스타일의 모달창을 통해 시각적으로 정돈된 결과 표시.
6. **데이터 로깅:** 분석된 텍스트와 결과를 Supabase DB에 저장.

## 3. 화면 구성 (Screen Composition & Design)
- **Typography:** SF Pro Display(Headlines), SF Pro Text(Body).
- **Colors:** Canvas (#ffffff, #f5f5f7), Action Blue (#0066cc), Ink (#1d1d1f).
- **Layout:** Global Nav(44px, Black), Hero Section, Result Modal(Frosted Glass).

## 4. 사용 기술 (Tech Stack)
- Front-end: HTML5, CSS3, Vanilla JavaScript
- Back-end: Node.js (Express)
- AI: OpenAI API (gpt-4o)
- Database: Supabase
- Deployment: Vercel

## 5. 데이터베이스 구조 (Database Structure)
Table: `sentiment_logs` (id, content, sentiment, confidence, reasoning, created_at)

## 6. API 명세서 (API Specification)
POST /api/analyze (Request: text / Response: sentiment, confidence, reasoning)

## 7. 성공 기준 & 제외 범위
- 성공 기준: Apple 디자인 가이드라인 준수, 응답 속도 3초 이내, 반응형 지원.
- 제외 범위: 로그인 기능, 히스토리 리스트 페이지, 다국어 번역.
