document.getElementById("search_btn").addEventListener('click', search_message);

function search_message() {
    alert("검색을 수행합니다!");
}

// 금지어 배열 (비속어 예시)
const forbiddenWords = ["바보", "멍청이", "나쁜", "욕", "꺼져"];

function googleSearch() {
    const searchTerm = document.getElementById("search_input").value.trim(); // 공백 제거

    // 1. 공백 검사
    if (searchTerm.length === 0) {
        alert("검색어를 입력하세요!");
        return false;
    }

    // 2. 비속어 검사 (배열 반복 활용)
    for (let i = 0; i < forbiddenWords.length; i++) {
        if (searchTerm.includes(forbiddenWords[i])) {
            alert("부적절한 검색어입니다!");
            return false;
        }
    }

    // 3. 정상 검색
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    window.open(googleSearchUrl, "_blank"); // 새 창에서 열기
    return false;
}


