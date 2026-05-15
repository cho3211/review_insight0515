const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function checkData() {
    console.log("Supabase 데이터 조회 시작...");
    
    const { data, error } = await supabase
        .from('sentiment_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

    if (error) {
        console.error("조회 실패:", error.message);
        return;
    }

    if (data && data.length > 0) {
        console.log("최신 데이터 확인 성공!");
        console.log("-----------------------------------------");
        console.log("ID:", data[0].id);
        console.log("감정:", data[0].sentiment);
        console.log("신뢰도:", data[0].confidence);
        console.log("이유:", data[0].reasoning);
        console.log("암호화된 내용(Content):", data[0].content);
        console.log("-----------------------------------------");
        console.log("주의: Content 필드가 복잡한 문자열(iv:hash) 형태라면 암호화가 성공한 것입니다.");
    } else {
        console.log("데이터가 없습니다. 테이블 생성을 확인하거나 분석을 먼저 진행해 주세요.");
    }
}

checkData();
