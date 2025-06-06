import { session_set, session_get, session_check } from './session.js';
import { encrypt_text, decrypt_text } from './js_crypto.js';
import { generateJWT, checkAuth } from './jwt_token.js';

function init() {
  const emailInput = document.getElementById('typeEmailX');
  const idsave_check = document.getElementById('idSaveCheck');
  const get_id = getCookie("id");

  if (get_id) {
    emailInput.value = get_id;
    idsave_check.checked = true;
  }

  session_check();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init_logined() {
  if (sessionStorage) {
    decrypt_text();
  } else {
    alert("세션 스토리지 지원 x");
  }
}

const check_xss = (input) => {
  const DOMPurify = window.DOMPurify;
  const sanitizedInput = DOMPurify.sanitize(input);

  if (sanitizedInput !== input) {
    alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
    return false;
  }

  return sanitizedInput;
};

const check_input = () => {
  const loginForm = document.getElementById('login_form');
  const emailInput = document.getElementById('typeEmailX');
  const passwordInput = document.getElementById('typePasswordX');
  const idsave_check = document.getElementById('idSaveCheck');

  alert('아이디, 패스워드를 체크합니다');

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const sanitizedEmail = check_xss(emailValue);
  const sanitizedPassword = check_xss(passwordValue);

  if (!emailValue) {
    alert('이메일을 입력하세요.');
    return false;
  }

  if (!passwordValue) {
    alert('비밀번호를 입력하세요.');
    return false;
  }

  if (emailValue.length < 10) {
    alert('아이디는 최소 10글자 이상 입력해야 합니다.');
    return false;
  }

  if (passwordValue.length < 15) {
    alert('비밀번호는 반드시 15글자 이상 입력해야 합니다.');
    return false;
  }

  const hasSpecialChar = /[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(passwordValue);
  const hasUpperCase = /[A-Z]/.test(passwordValue);
  const hasLowerCase = /[a-z]/.test(passwordValue);

  if (!hasSpecialChar) {
    alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
    return false;
  }

  if (!hasUpperCase || !hasLowerCase) {
    alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
    return false;
  }

  if (!sanitizedEmail || !sanitizedPassword) {
    return false;
  }

  if (idsave_check.checked) {
    console.log("쿠키를 저장합니다:", emailValue);
    setCookie("id", emailValue, 1);
    alert("쿠키 값: " + emailValue);
  } else {
    setCookie("id", emailValue, 0);
  }

  const payload = {
    id: emailValue,
    exp: Math.floor(Date.now() / 1000) + 3600
  };

  const jwtToken = generateJWT(payload);

  console.log('이메일:', emailValue);
  console.log('비밀번호:', passwordValue);

  session_set();
  localStorage.setItem('jwt_token', jwtToken);
  login_count(); // `로그인 횟수 쿠키 증가
  loginForm.submit();
};

function setCookie(name, value, expiredays) {
  const date = new Date();
  date.setDate(date.getDate() + expiredays);
  document.cookie = escape(name) + "=" + escape(value) + ";expires=" + date.toUTCString() + "; path=/";
}

function getCookie(name) {
  const cookie = document.cookie;
  console.log("쿠키를 요청합니다.");

  if (cookie !== "") {
    const cookie_array = cookie.split("; ");
    for (let index in cookie_array) {
      const cookie_pair = cookie_array[index].split("=");
      if (cookie_pair[0] === name) {
        return cookie_pair[1];
      }
    }
  }
  return null;
}

function login_count() {
  let loginCnt = parseInt(getCookie("login_cnt")) || 0;
  loginCnt += 1;
  setCookie("login_cnt", loginCnt, 7);
  console.log("로그인 횟수:", loginCnt);
}

function logout_count() {
  let logoutCnt = parseInt(getCookie("logout_cnt")) || 0;
  logoutCnt += 1;
  setCookie("logout_cnt", logoutCnt, 7);
  console.log("로그아웃 횟수:", logoutCnt);
}import { session_del } from './session.js';

function logout() {
  session_del(); // 세션 삭제
  logout_count(); //쿠키 증가
  location.href = '../index.html'; // 메인으로 이동
}


document.getElementById("login_btn").addEventListener('click', check_input);
