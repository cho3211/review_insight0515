/* 
    Sentimental AI - Front-end Logic (app.js)
    작성자: Antigravity
    설명: 사용자의 입력을 처리하고, 서버와 통신하며 결과를 화면에 보여주는 핵심 로직입니다.
*/

// --- DOM 요소 선택 (화면의 구성 요소들을 변수에 담습니다) ---
const textInput = document.getElementById('text-input');       // 텍스트 입력창
const analyzeBtn = document.getElementById('analyze-btn');     // 분석 버튼
const resultModal = document.getElementById('result-modal');   // 결과 모달창
const closeModalBtn = document.getElementById('close-modal');  // 모달 닫기 버튼

// 결과 표시 영역
const sentimentResult = document.getElementById('sentiment-result'); // 감정(긍정/부정)
const confidenceBar = document.getElementById('confidence-bar');     // 신뢰도 바
const confidenceText = document.getElementById('confidence-text');   // 신뢰도 수치
const reasoningText = document.getElementById('reasoning-text');     // 분석 이유

// --- 모달 제어 함수 ---

/**
 * 모달창을 화면에 표시합니다.
 */
function showModal() {
    resultModal.classList.remove('hidden');
}

/**
 * 모달창을 화면에서 숨깁니다.
 */
function hideModal() {
    resultModal.classList.add('hidden');
}

// --- 감성 분석 로직 ---

/**
 * 실제로 백엔드 API를 호출하여 감성 분석을 요청하는 함수입니다.
 * (현재는 Step 2 단계이므로 가상의 응답을 시뮬레이션합니다.)
 */
async function analyzeSentiment() {
    const text = textInput.value.trim();

    // 1. 입력 유효성 검사 (아무것도 입력하지 않았을 때)
    if (!text) {
        alert("분석할 문장을 입력해 주세요.");
        return;
    }

    // 2. 로딩 상태 표시 (버튼 비활성화 및 텍스트 변경)
    analyzeBtn.disabled = true;
    analyzeBtn.innerText = "분석 중...";
    analyzeBtn.style.opacity = "0.7";

    try {
        // 실제 API 호출
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        
        if (!response.ok) {
            throw new Error("서버 응답 오류");
        }
        
        const data = await response.json();

        // 3. 화면에 결과 업데이트 (실제 데이터 적용)
        updateResultUI(data);
        
        // 4. 결과 모달창 띄우기
        showModal();

    } catch (error) {
        console.error("분석 중 오류 발생:", error);
        alert("분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
        // 5. 로딩 상태 해제 (버튼 원상복구)
        analyzeBtn.disabled = false;
        analyzeBtn.innerText = "분석 하기";
        analyzeBtn.style.opacity = "1";
    }
}

/**
 * 서버에서 받은 데이터를 화면 요소들에 적용합니다.
 */
function updateResultUI(data) {
    sentimentResult.innerText = data.sentiment;
    
    // 신뢰도 수치 및 그래프 업데이트
    confidenceText.innerText = `${data.confidence}%`;
    confidenceBar.style.width = `${data.confidence}%`;
    
    // 감정에 따른 뱃지 색상 변경 (긍정/부정/중립)
    if (data.sentiment === "긍정") {
        sentimentResult.style.backgroundColor = "#34c759"; // Apple Green
    } else if (data.sentiment === "부정") {
        sentimentResult.style.backgroundColor = "#ff3b30"; // Apple Red
    } else {
        sentimentResult.style.backgroundColor = "#8e8e93"; // Apple Gray
    }
    
    reasoningText.innerText = data.reasoning;
}

// --- 이벤트 리스너 등록 ---

// '분석하기' 버튼 클릭 시
analyzeBtn.addEventListener('click', analyzeSentiment);

// 모달 닫기 버튼 클릭 시
closeModalBtn.addEventListener('click', hideModal);

// 모달 바깥 배경 클릭 시 닫기
window.addEventListener('click', (event) => {
    if (event.target === resultModal.querySelector('.modal-overlay')) {
        hideModal();
    }
});

// 엔터 키(Ctrl+Enter)로 분석 시작하기 기능
textInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        analyzeSentiment();
    }
});
