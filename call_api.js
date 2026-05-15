const http = require('http');

const data = JSON.stringify({
    text: "데이터베이스 연동 테스트를 위해 자동으로 생성된 문장입니다."
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/analyze',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log("서버 응답 상태 코드:", res.statusCode);
        console.log("서버 응답 결과:", body);
    });
});

req.on('error', (error) => {
    console.error("API 호출 중 오류 발생:", error.message);
});

req.write(data);
req.end();
