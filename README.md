# HTML 프로젝트 - 깃허브
새로운 시작! 웹 서비스 개발의 세계로 떠나보아요~
## Getting Started
This project is a starting point for a Web application.
- [프로젝트 메인 주소](https://github.com/yein05/WEB_MAIN)
## 2주차 수업 메인화면 개발 완료! (문제 포함)
## 3주차 수업 부트스트랩 적용 완료! (문제 제외)
 

## 전체 실습과정 완료
- 로그인, 로그아웃, 쿠키 저장, 세션 처리 등 기본 기능 완전 구현
- DOMPurify를 사용한 XSS 필터링 구현 완료
- JWT 토큰 생성 및 로컬 스토리지 저장 적용


## 응용 문제 해결 (추가기능 구현)
- **로그인/로그아웃 횟수 쿠키 저장 기능** 구현 완료  
  - `login_count()`, `logout_count()` 함수로 쿠키 값 저장 및 증가
  - 쿠키 이름: `login_cnt`, `logout_cnt`
 - 로그인 버튼 클릭 시 자동으로 로그인 횟수 +1
 - 로그아웃 버튼 클릭 시 로그아웃 횟수 +1 (※ logout 버튼 이벤트 리스너에 연결 필요)
 -비속어 검사 구현 완료
 -프로필 개인정보 변경 완료


## 홈페이지 내용 수정
- HTML 내 주석, 입력 필드 및 버튼의 라벨 수정
- 배경 이미지 수정정

##  소스 코드 정리
- 함수 분리: `login_count`, `logout_count`, `check_input`, `check_xss`, `getCookie`, `setCookie` 등 모듈화
- 적절한 함수 이름 및 주석 작성
- import된 모듈 명확히 정리 (`session.js`, `js_crypto.js`, `jwt_token.js`)

## 기타
- 쿠키/세션/로컬스토리지 3가지 저장 방식 혼합 적용
- 입력값 검사 시 정규표현식 사용
- 비밀번호 검증 조건 (길이, 대소문자, 특수문자 포함 등)

---

## 파일 목록
- `login.js` – 로그인 기능 및 쿠키 구현 핵심 JS
- `session.js` – 세션 저장 및 확인 함수 포함
- `js_crypto.js` – 암호화/복호화 관련 로직
- `jwt_token.js` – JWT 토큰 생성 및 인증 처리
