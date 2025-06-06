  // JWT 비밀 키 (실제 운영 환경에서는 복잡한 키 사용 필수)
const JWT_SECRET = "your_secret_key_here";

export function generateJWT(payload) {
  // 1. 헤더 생성 및 Base64 인코딩
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = btoa(JSON.stringify(header));

  // 2. 페이로드 Base64 인코딩
  const encodedPayload = btoa(JSON.stringify(payload));

  // 3. 서명 생성 (HMAC-SHA256 알고리즘 사용)
  const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}`, JWT_SECRET);
  const encodedSignature = CryptoJS.enc.Base64.stringify(signature);

  // 4. 최종 토큰 조합
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

function verifyJWT(token) { // 토큰 검증
  try {
    // 1. 토큰을 헤더, 페이로드, 서명으로 분할
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;

    // 2. 서명 재계산 및 비교
    const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}`, JWT_SECRET);
    const calculatedSignature = CryptoJS.enc.Base64.stringify(signature);

    if (calculatedSignature !== encodedSignature) return null;

    // 3. 페이로드 파싱 및 만료 시간 검증
    const payload = JSON.parse(atob(encodedPayload));

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      console.log('보안 토큰이 만료되었습니다');
      return null;
    }

    return payload;

  } catch (error) {
    return null;
  }
}

function isAuthenticated() { // 사용자 인증 상태 확인
  const token = localStorage.getItem('jwt_token');
  if (!token) return false;

  const payload = verifyJWT(token);
  console.log(payload);

  return !!payload;
}

export function checkAuth() { // 인증 검사 수행
  const authenticated = isAuthenticated();
  if (authenticated) {
    alert('정상적으로 토큰이 검증되었습니다.');
  } else {
    alert('토큰 검증 에러!! 인증되지 않은 접근입니다.');
    // window.location.href = '../login/login.html';
  }
}
