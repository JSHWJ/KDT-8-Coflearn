const modal1 = document.querySelector("#modalWrap_ch");
const modal2 = document.querySelector("#modalWrap2_ch");
const closeBtn = document.querySelector("closeBtn_ch");
function openrecoplearn() {
  modal1.style.display = "block";
}
function closepop_ch() {
  modal1.style.display = "none";
}
function participate() {
  modal2.style.display = "block";
}
function closepop2_ch() {
  modal2.style.display = "none";
}

function Start_ch() {
  const form = document.forms["modalrecoplearn_ch"];
  const radioGroup = document.getElementsByName("rule_ch");
  let selectedValue = "";
  for (const radioButton of radioGroup) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break;
    }
  }
  console.log(
    selectedValue,
    form.front_ability.value,
    form.back_ability.value,
    form.recoplearn_goal.value
  );
}

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
