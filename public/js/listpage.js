document.addEventListener("DOMContentLoaded", function () {
  const tag_ch = document.querySelector(".tag_ch");
  const dropdownBtn_ch = document.querySelector("#dropdown-button_ch");

  function addTag(tagname) {
    const tag_div = document.createElement("button");
    tag_div.textContent = tagname;
    tag_div.addEventListener("click", function (e) {
      e.currentTarget.classList.toggle("active");
    });
    tag_div.style.marginRight = "5px";
    tag_ch.appendChild(tag_div);
  }

  for (let i = 1; i <= 10; i++) {
    addTag("#" + i);
  }
  console.log(dropdownBtn_ch);
  dropdownBtn_ch.addEventListener("click", function () {
    for (let i = 11; i <= 20; i++) {
      addTag("#" + i);
    }
  });
});

function gotopageUpload() {
  window.location.href = "/";
}
