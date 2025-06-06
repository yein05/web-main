import { encrypt_text, decrypt_text } from './js_crypto.js';

// 객체 형태 세션 저장
export function session_set(obj) {
  let id = document.querySelector("#typeEmailX");
  let password = document.querySelector("#typePasswordX");
  let random = new Date(); // 랜덤 타임스탬프

  if (sessionStorage) {
    const objString = JSON.stringify(obj); // 객체 -> JSON 문자열
    let en_text = encrypt_text(objString); // 암호화
    sessionStorage.setItem("Session_Storage_join", objString); // 암호화된 문자열 저장 가능
  } else {
    alert("세션 스토리지 지원 x");
  }
}

// 입력값으로 세션 저장
export function session_set2() {
  let session_id = document.querySelector("#form3Example3c");
  let session_pass = document.querySelector("#form3Example4c");

  if (sessionStorage) {
    let en_text = encrypt_text(session_pass.value);
    sessionStorage.setItem("Session_Storage_id", session_id.value);
    sessionStorage.setItem("Session_Storage_pass", en_text);
  } else {
    alert("로컬 스토리지 지원 x");
  }
}

// 세션값 읽기
export function session_get() {
  if (sessionStorage) {
    return sessionStorage.getItem("Session_Storage_pass");
  } else {
    alert("세션 스토리지 지원 x");
  }
}

// 로그인 여부 검사
export function session_check() {
  if (sessionStorage.getItem("Session_Storage_id")) {
    alert("이미 로그인 되었습니다.");
    location.href = '../login/index_login.html';
  }
}

export function session_del() {
  if (sessionStorage) {
    sessionStorage.removeItem("Session_Storage_join"); // 저장된 세션 키에 맞게!
    alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
  } else {
    alert('세션 스토리지 지원 x');
  }
}

