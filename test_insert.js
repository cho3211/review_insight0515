const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function testInsert() {
    console.log("Supabase 직접 Insert 테스트 중...");
    
    const { data, error } = await supabase
        .from('sentiment_logs')
        .insert([
            { 
                content: "직접 테스트 데이터 (암호화 생략)", 
                sentiment: "중립", 
                confidence: 100, 
                reasoning: "시스템 연동 테스트를 위한 직접 입력 데이터입니다." 
            }
        ])
        .select();

    if (error) {
        console.error("저장 실패:", error.message);
        console.log("힌트: Supabase 대시보드에서 테이블이 정확히 생성되었는지 확인해 주세요.");
    } else {
        console.log("저장 성공!", data);
    }
}

testInsert();
