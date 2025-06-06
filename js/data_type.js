let number = 5;
let str = "문자열입력";           // 문자열 변수
let prime = 1.5123;              // 실수형 변수
let is_ok = true;                // 참 (Boolean)
let is_not = false;              // 거짓 (Boolean)
let undefi;                      // 변수 선언만, 초기화 X
let empty = null;                // 비어 있음

console.log(undefi, empty);      // 여러 개 변수 출력

// 사용자 정보 Map 객체 생성
const users = new Map();

// 사용자 정보 추가
users.set("user1", {
    id: 1,
    password: "password123"
});
users.set("user2", {
    id: 2,
    password: "password456"
});

// Map 객체의 모든 사용자 정보 반복 출력
for (const [username, user] of users) {
    console.log(`사용자 이름: ${username}`, `ID: ${user.id}`);
    console.log(`비밀번호: ${user.password}`);
}

// Set 객체 활용: 사용자 이름 저장
const usernames = new Set();
usernames.add("user1");
usernames.add("user2");

// Set 객체의 모든 사용자 이름 반복 출력
for (const username of usernames) {
    console.log(`사용자 이름: ${username}`);
}
