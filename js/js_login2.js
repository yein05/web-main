// 팝업 열기 (쿠키 체크 포함)
function pop_up() {
  const cookieCheck = getCookie("popupYN");
  if (cookieCheck !== "N") {
    window.open("../popup/popup.html", "팝업테스트", "width=400, height=300, top=10, left=10");
  }
}

// 팝업 창 닫기
function close_window() {
  window.close();
}

// 쿠키 설정
function setCookie(name, value, expiredays) {
  const date = new Date();
  date.setDate(date.getDate() + expiredays);
  document.cookie = escape(name) + "=" + escape(value) + ";expires=" + date.toUTCString() + "; path=/";
}

// 쿠키 읽기
function getCookie(name) {
  const cookie = document.cookie;
  console.log("쿠키를 요청합니다.");
  if (cookie !== "") {
    const cookie_array = cookie.split("; ");
    for (let i in cookie_array) {
      const cookie_pair = cookie_array[i].split("=");
      if (cookie_pair[0] === name) {
        return cookie_pair[1];
      }
    }
  }
  return null;
}

// 팝업 닫기 및 쿠키 설정
function closePopup() {
  if (document.getElementById('check_popup').checked) {
    setCookie("popupYN", "N", 1);
    console.log("쿠키를 설정합니다.");
    self.close();
  }
}

// 마우스 오버 이미지 변경
function over(obj) {
  obj.src = "image/logn.png";
}

// 마우스 아웃 이미지 변경
function out(obj) {
  obj.src = "image/logo2.png";
}

// 시계 표시
function show_clock() {
  const currentDate = new Date();
  const divClock = document.getElementById('divClock');
  let msg = "현재 시간 : ";

  if (currentDate.getHours() > 12) {
    msg += "오후 ";
    msg += (currentDate.getHours() - 12) + "시 ";
  } else {
    msg += "오전 ";
    msg += currentDate.getHours() + "시 ";
  }

  msg += currentDate.getMinutes() + "분 ";
  msg += currentDate.getSeconds() + "초";

  divClock.innerText = msg;

  if (currentDate.getMinutes() > 58) {
    divClock.style.color = "red";
  }

  setTimeout(show_clock, 1000);
}
