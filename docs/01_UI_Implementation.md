# Step 1: UI & Design System Implementation

## 1. 전역 스타일 설정 (Design Tokens)
- **Typography:** SF Pro Display(Headlines), SF Pro Text(Body). 
  - *Note:* Display 사이즈(17px 이상)에서 `letter-spacing: -0.022em` 적용.
- **Colors:**
  - `--color-primary`: #0066cc (Action Blue)
  - `--color-canvas`: #ffffff (Pure White)
  - `--color-parchment`: #f5f5f7 (Parchment)
  - `--color-ink`: #1d1d1f (Near-Black)
- **Border Radius:** `pill: 9999px`, `card: 18px`, `button-sm: 8px`.

## 2. 레이아웃 구조 (HTML/CSS)
- **Global Nav:** 44px 높이, 배경 #000000, 중앙 정렬된 로고.
- **Hero Section:** 텍스트 입력 영역. 배경은 `--color-parchment`.
  - 대형 타이틀: "Sentimental AI." (56px)
  - 텍스트 영역: 테두리 없는 깔끔한 디자인의 `<textarea>`.
- **Primary Button:** `--color-primary` 배경의 Pill 형태. 
  - `active` 상태 시 `transform: scale(0.95)` 애니메이션 필수.

## 3. 결과 모달 (Result Modal)
- `backdrop-filter: blur(20px)`가 적용된 반투명 모달.
- 구성: 감정 상태(긍정/부정/중립), 신뢰도(%), 구분선, 분석 이유(2~3문장).
