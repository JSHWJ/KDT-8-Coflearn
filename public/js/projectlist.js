let tags;
let project;
let count_ch = 0;
let count = 1;
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await axios({
      method: "POST",
      url: "/api/project-list",
    });
    tags = response.data.data.tag;
    project = response.data.data.title;
  } catch (error) {
    console.log("axios에러", error);
  }
  const tag_ch = document.querySelector(".tag_ch");
  function addTag(tagname, i) {
    const tag_div = document.createElement("button");
    tag_div.textContent = tagname;
    tag_div.className = tagname + "_ch";
    tag_div.addEventListener("click", function (e) {
      e.currentTarget.classList.toggle("active");
    });
    tag_div.style.marginRight = "5px";
    if (i >= 8) {
      tag_div.style.display = "none";
    }
    tag_ch.appendChild(tag_div);
  }
  for (let i = 1; i <= Object.keys(tags).length; i++) {
    addTag("#" + tags[i], i);
  }
  for (const key in project) {
    if (count_ch % 5 == 0) {
      let searchctn_ch = document.createElement("div");
      searchctn_ch.classList.add("searchctn_ch", count + "_ch");
      document.querySelector("section").appendChild(searchctn_ch);
      count += 1;
    }
    let section = document.getElementsByClassName(count - 1 + "_ch");
    console.log(section);
    let content_ch = document.createElement("div");
    if (project[key][1] == null) {
      content_ch.innerHTML = `
    <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLMMS0tZyqfTuSnDSIB6hSRZYfeBE7xsSxow&usqp=CAU"
                alt="이미지"
                class="sumnail_ch"
              />
              <div class="contentTitle_ch">${key}</div>
              <div class="contentContent_ch">${project[key][0]}</div>`;
    } else {
      content_ch.innerHTML = `
    <img
                src="${project[key][1]}"
                alt="이미지"
                class="sumnail_ch"
              />
              <div class="contentTitle_ch">${key}</div>
              <div class="contentContent_ch">${project[key][0]}</div>`;
    }
    content_ch.className = "content_ch";
    content_ch.setAttribute("onclick", `movedetail(${project[key][2]})`);
    content_ch.style.cursor = "pointer";
    section[0].appendChild(content_ch);
    count_ch += 1;
  }
});
const clickdown = () => {
  for (let i = 8; i <= Object.keys(tags).length; i++) {
    let changedisplay = document.getElementsByClassName("#" + tags[i] + "_ch");
    changedisplay[0].style.display = "inline-block";
  }
  document.querySelector(".fa-angle-down").className = "fa-solid fa-angle-up";
  document.querySelector(".dropBtn_ch").setAttribute("onclick", "clickup()");
};
const clickup = () => {
  for (let i = 8; i <= Object.keys(tags).length; i++) {
    let changedisplay = document.getElementsByClassName("#" + tags[i] + "_ch");
    changedisplay[0].style.display = "none";
  }
  document.querySelector(".fa-angle-up").className = "fa-solid fa-angle-down";
  document.querySelector(".dropBtn_ch").setAttribute("onclick", "clickdown()");
};
function gotopageUpload() {
  window.location.href = "/project";
}
function movedetail(n) {
  window.location.href = `/detailPage/${n}`;
}
