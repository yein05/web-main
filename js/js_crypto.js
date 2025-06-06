import { session_get } from './session.js';

// AES256 암호화
function encodeByAES256(key, data) {
  const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(""), // 보안상 실제 배포 시에는 랜덤 IV를 써야 함
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return cipher.toString();
}

// AES256 복호화
function decodeByAES256(key, data) {
  const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(""),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return cipher.toString(CryptoJS.enc.Utf8);
}

// 비밀번호 암호화 함수
export function encrypt_text(password) {
  const key = "key"; // 암호화 키 (보안상 서버 전용 키 사용 권장)
  const paddedKey = key.padEnd(32, " ");
  const encrypted = encodeByAES256(paddedKey, password);
  return encrypted;
}

// 세션에서 가져온 데이터를 복호화하는 함수
export function decrypt_text() {
  const key = "key"; // 복호화 키 (서버와 동일)
  const paddedKey = key.padEnd(32, " ");
  const encrypted = session_get();
  const decrypted = decodeByAES256(paddedKey, encrypted);
  console.log(decrypted); // 복호화된 결과 출력
}
