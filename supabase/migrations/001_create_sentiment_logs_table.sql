-- 
-- Sentimental AI - Database Migration
-- 설명: 분석 결과를 저장하기 위한 테이블을 생성합니다.
-- 파일명: 001_create_sentiment_logs_table.sql
--

CREATE TABLE IF NOT EXISTS sentiment_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- 고유 아이디
    content TEXT NOT NULL,                         -- 분석된 텍스트 (암호화되어 저장될 예정)
    sentiment VARCHAR(20) NOT NULL,                -- 분석 결과 (긍정/부정/중립)
    confidence INTEGER NOT NULL,                   -- 신뢰도 (0~100)
    reasoning TEXT,                                -- 분석 이유 설명
    created_at TIMESTAMPTZ DEFAULT NOW()           -- 생성 일시
);

-- 보안을 위한 인덱스 설정 (필요 시)
CREATE INDEX idx_sentiment ON sentiment_logs(sentiment);
