# Step 3: AI Integration & API Logic

## 1. OpenAI API 설정
- `openai` 라이브러리 설치 및 API 키 설정.
- 모델: `gpt-4o` 또는 `gpt-3.5-turbo` 사용.

## 2. 프롬프트 엔지니어링 (System Prompt)
- AI에게 다음과 같은 페르소나와 출력 형식을 지정:
  "너는 숙련된 감성 분석가야. 입력된 텍스트를 분석하여 1.감정(긍정/부정/중립), 2.신뢰도(0~100), 3.이유(2~3문장)를 JSON 형식으로만 답변해."

## 3. API 엔드포인트 완성 (POST /api/analyze)
- 클라이언트로부터 텍스트 수신 -> OpenAI 호출 -> 결과 가공 -> Supabase 저장 -> 클라이언트 응답 순서로 구현.
