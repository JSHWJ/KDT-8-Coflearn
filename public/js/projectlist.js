let tags;
let project;
let count_ch = 0;
let count = 1;

//render전 데이터 가져오기
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

  //태그 목록 가져와 태그 만들기
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

  //프로젝트 목록가져와 프로젝트 목록만들기
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

//태그 목록 화살표 위로변경
const clickdown = () => {
  for (let i = 8; i <= Object.keys(tags).length; i++) {
    let changedisplay = document.getElementsByClassName("#" + tags[i] + "_ch");
    changedisplay[0].style.display = "inline-block";
  }
  document.querySelector(".fa-angle-down").className = "fa-solid fa-angle-up";
  document.querySelector(".dropBtn_ch").setAttribute("onclick", "clickup()");
};

//태그 목록 화살표 아래로 변경
const clickup = () => {
  for (let i = 8; i <= Object.keys(tags).length; i++) {
    let changedisplay = document.getElementsByClassName("#" + tags[i] + "_ch");
    changedisplay[0].style.display = "none";
  }
  document.querySelector(".fa-angle-up").className = "fa-solid fa-angle-down";
  document.querySelector(".dropBtn_ch").setAttribute("onclick", "clickdown()");
};

//프로젝트 목록
function gotopageUpload() {
  window.location.href = "/project";
}

//프로젝트별 상세목록 가기
function movedetail(n) {
  window.location.href = `/detailPage/${n}`;
}

// 검색기능 구현하기
const search = document.querySelector("#searchcontent_ch");
search.addEventListener("keydown", async function (e) {
  if (e.key === "Enter") {
    window.location.replace(`/search?value=${search.value}`);
  }
});
