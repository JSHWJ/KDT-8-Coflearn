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
function participate() {
  modal2.style.display = "block";
}
function closepop2_ch() {
  modal2.style.display = "none";
}

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
  });
  if (response.data.result == true) {
    modal1.style.display = "none";
  }
}

// 참여하기 버튼
function participate_ch() {
  const form = document.forms["modalrecoplearn2_ch"];
  const radioGroup = document.getElementsByName("rule_ch");
  let selectedValue = "";
  for (const radioButton of radioGroup) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break;
    }
  }
  console.log(selectedValue, form.promise_ch.value);
}

function alertrecoplearn() {
  alert("이미 리코프런이 생성된 프로젝트 입니다.");
}
