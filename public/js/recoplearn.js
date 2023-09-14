let cookie = document.cookie;
const [name_ch, value_ch] = cookie.trim().split("=");
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const currentUrl = window.location.href;
    //차후 배포시 변경하기
    let num = currentUrl.replace("http://localhost:8000/detailPage/", "");
    const rs_hi = document.querySelector(".rs_hi");
    const response = await axios({
      method: "POST",
      url: "/api/detailpage/recoplearnBtn",
      data: { num },
    });
    if (response.data.result == true) {
      rs_hi.innerHTML = `<button id="rsBtn_hi" onclick="openrecoplearn()">
      Recoplearn <br />Start
    </button>`;
    } else {
      rs_hi.innerHTML = `<button id="rsBtn_ch"
      onclick="alertrecoplearn()">
      Recoplearn <br />Ing ~
    </button>`;
    }
  } catch (error) {}
});

const modal1 = document.querySelector("#modalWrap_ch");
const modal2 = document.querySelector("#modalWrap2_ch");
const closeBtn = document.querySelector("closeBtn_ch");
let currentfront = 0;
let currentback = 0;
let goalfront = 0;
let goalback = 0;

async function openrecoplearn() {
  const currentUrl = window.location.href;
  //차후 배포시 변경하기
  let num = currentUrl.replace("http://localhost:8000/detailPage/", "");

  const response = await axios({
    method: "POST",
    url: `/api/detailPage/${num}/recplearn/info`,
    data: { num },
  });
  const div = document.querySelector(".allnum_ch");
  let span = document.createElement("span");
  goalfront = response.data.frontnum;
  goalback = response.data.backnum;
  span.innerHTML =
    "프론트엔드 : " +
    response.data.frontnum +
    "&nbsp&nbsp&nbsp" +
    "  백엔드 : " +
    response.data.backnum;
  div.appendChild(span);
  modal1.style.display = "block";
}
function closepop_ch() {
  modal1.style.display = "none";
  const div = document.querySelector(".allnum_ch");
  div.innerHTML = "";
}

//참여하기 버튼
async function participate() {
  const currentUrl = window.location.href;
  //차후 배포시 변경하기
  let num = currentUrl.replace("http://localhost:8000/detailPage/", "");

  const response = await axios({
    method: "POST",
    url: "/api/detailpage/recoplearncheck",
    data: {
      data: num,
    },
    headers: {
      Authorization: `Bearer ${value_ch}`, // JWT를 'Bearer' 스킴으로 포함
      "Content-Type": "application/json", // 요청 본문의 타입 설정 (예시)
    },
  });
  console.log(response.data.result);
  if (response.data.result === false) {
    modal2.style.display = "block";
  } else {
    alert("이미 현재 프로젝트 리코프런에 참가한 유저입니다.");
  }
}
function closepop2_ch() {
  modal2.style.display = "none";
}

//리코프런 생성
async function Start_ch() {
  const currentUrl = window.location.href;
  //차후 배포시 변경하기
  let num = currentUrl.replace("http://localhost:8000/detailPage/", "");

  const form = document.forms["modalrecoplearn_ch"];
  const radioGroup = document.getElementsByName("rule_ch");
  let selectedValue = "";
  for (const radioButton of radioGroup) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break;
    }
  }
  if (selectedValue == "front") {
    currentfront += 1;
  } else {
    currentback += 1;
  }
  let data = {
    project_id: num,
    front_num: currentfront,
    back_num: currentback,
    front_goal_num: goalfront,
    back_goal_num: goalback,
    current_num: currentfront + currentback,
    goal_num: goalfront + goalback,
    frontability: form.front_ability.value,
    backability: form.back_ability.value,
    recoplearn_goal: form.recoplearn_goal.value,
  };
  const response = await axios({
    method: "POST",
    url: `/api/detailpage/recoplearn/make`,
    data,
    headers: {
      Authorization: `Bearer ${value_ch}`, // JWT를 'Bearer' 스킴으로 포함
      "Content-Type": "application/json", // 요청 본문의 타입 설정 (예시)
    },
  });
  if (response.data.result == true) {
    modal1.style.display = "none";
    window.location.href = "";
  }
}

// 참여하기 버튼
async function participate_ch() {
  const currentUrl = window.location.href;
  //차후 배포시 변경하기
  let num = currentUrl.replace("http://localhost:8000/detailPage/", "");

  const form = document.forms["modalrecoplearn2_ch"];
  const radioGroup = document.getElementsByName("rule2_ch");
  let selectedValue = "";
  for (const radioButton of radioGroup) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break;
    }
  }
  console.log(selectedValue);
  const response = await axios({
    method: "POST",
    url: "/api/detailpage/recoplearn/join",
    data: { data: num, role: selectedValue },
    headers: {
      Authorization: `Bearer ${value_ch}`, // JWT를 'Bearer' 스킴으로 포함
      "Content-Type": "application/json", // 요청 본문의 타입 설정 (예시)
    },
  });
  if (response.data.result == true) {
    alert("리코프런에 참여되셨습니다.");
    modal2.style.display = "none";
  } else {
    alert(response.data.result);
  }
}

function alertrecoplearn() {
  alert("이미 리코프런이 생성된 프로젝트 입니다.");
}
