import { session_set2 } from './session.js';

class SignUp {
    constructor(name, email, password, re_password) {
        this._name = name;
        this._email = email;
        this._password = password;
        this._re_password = re_password;
    }

    setUserInfo(name, email, password, re_password) {
        this._name = name;
        this._email = email;
        this._password = password;
        this._re_password = re_password;
    }

    getUserInfo() {
        return {
            name: this._name,
            email: this._email,
            password: this._password,
            re_password: this._re_password
        };
    }
}

function join() {
    const form = document.querySelector("#join_form");
    const name = document.querySelector("#form3Example1c");
    const email = document.querySelector("#form3Example3c");
    const password = document.querySelector("#form3Example4c");
    const re_password = document.querySelector("#form3Example4cd");
    const agree = document.querySelector("#form2Example3c");

    const nameRegex = /^[가-힣]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    form.action = "../index.html";
    form.method = "get";

    // 입력값 누락 검사
    if (
        name.value.length === 0 ||
        email.value.length === 0 ||
        password.value.length === 0 ||
        re_password.value.length === 0
    ) {
        alert("회원가입 폼에 모든 정보를 입력해주세요.");
        return;
    }

    // 이름 형식 검사
    if (!nameRegex.test(name.value)) {
        alert("이름은 한글만 입력 가능합니다.");
        name.focus();
        return;
    }

    // 이메일 형식 검사
    if (!emailRegex.test(email.value)) {
        alert("이메일 형식이 올바르지 않습니다.");
        email.focus();
        return;
    }

    // 비밀번호 형식 검사
    if (!pwRegex.test(password.value)) {
        alert("비밀번호는 8자 이상이며 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.");
        password.focus();
        return;
    }

    // 비밀번호 일치 검사
    if (password.value !== re_password.value) {
        alert("비밀번호가 일치하지 않습니다.");
        re_password.focus();
        return;
    }

    // 약관 동의 체크
    if (!agree.checked) {
        alert("약관에 동의하셔야 가입이 가능합니다.");
        return;
    }

    // 회원가입 객체 생성 및 세션 저장
    const newSignUp = new SignUp(name.value, email.value, password.value, re_password.value);
    session_set2(newSignUp);

    // 폼 제출
    form.submit();
}

// 이벤트 연결
document.getElementById("join_btn").addEventListener('click', join);
