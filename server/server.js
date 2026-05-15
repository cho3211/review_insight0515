/* 
    Sentimental AI - Backend Server (server.js)
    작성자: Antigravity
    설명: OpenAI 분석, Supabase 저장, 데이터 암호화 로직이 모두 포함된 완성형 서버 코드입니다.
*/

// --- 필요한 라이브러리 불러오기 ---
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const { createClient } = require('@supabase/supabase-js'); // Supabase 클라이언트
const crypto = require('crypto'); // 데이터 암호화를 위한 노드 내장 모듈

// 환경 변수 설정
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- 미들웨어 설정 ---
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// --- 외부 서비스 초기화 ---

// 1. OpenAI 초기화
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// 2. Supabase 초기화
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- 보안 및 암호화 로직 (Rule 8 준수) ---

/**
 * 데이터를 암호화합니다 (AES-256-CBC 방식)
 * 사용자의 개인정보(입력 텍스트)를 보호하기 위해 DB 저장 전 실행합니다.
 */
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'a_very_secret_key_32_chars_long!!'; // 32자 키
const IV_LENGTH = 16; // AES 블록 사이즈

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// --- API 엔드포인트 구현 ---

app.post('/api/analyze', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: '분석할 텍스트가 없습니다.' });
    }

    try {
        // 1. OpenAI API 호출하여 감성 분석 진행
        const aiResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "너는 숙련된 감성 분석가야. 입력된 텍스트를 분석하여 반드시 아래와 같은 JSON 형식으로만 답변해.\n" +
                             "{\n" +
                             "  \"sentiment\": \"긍정\", \"부정\", 또는 \"중립\",\n" +
                             "  \"confidence\": 0에서 100 사이의 숫자,\n" +
                             "  \"reasoning\": \"분석한 이유 (2~3문장의 짧은 설명)\"\n" +
                             "}"
                },
                {
                    role: "user",
                    content: text
                }
            ],
            response_format: { type: "json_object" }
        });

        const analysisResult = JSON.parse(aiResponse.choices[0].message.content);

        // 2. 보안을 위해 원본 텍스트 암호화
        const encryptedContent = encrypt(text);

        // 3. Supabase DB에 결과 저장
        const { data, error } = await supabase
            .from('sentiment_logs')
            .insert([
                { 
                    content: encryptedContent, // 암호화된 텍스트 저장
                    sentiment: analysisResult.sentiment, 
                    confidence: analysisResult.confidence, 
                    reasoning: analysisResult.reasoning 
                }
            ]);

        if (error) {
            console.error("DB 저장 오류:", error);
            // DB 저장이 실패해도 분석 결과는 사용자에게 보여줄 수 있도록 에러를 던지지 않습니다.
        }

        // 4. 클라이언트에 최종 결과 응답
        res.json(analysisResult);

    } catch (error) {
        console.error("서버 오류:", error);
        res.status(500).json({ error: "분석 중 오류가 발생했습니다." });
    }
});

// --- 서버 시작 ---
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 작동 중입니다.`);
});
