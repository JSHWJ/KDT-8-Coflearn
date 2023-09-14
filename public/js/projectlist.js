let tags;
let project;
let count_ch = 0;
let count = 1;
let selectedTag = [];

//render전 프로젝트 리스트 데이터 가져오기
document.addEventListener("DOMContentLoaded", async function () {
  //테스트
  const currentUrl = window.location.href;
  let num = currentUrl.replace("http://15.164.79.184/project-list", "");
  if (num == "") {
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
      tag_div.textContent = "# " + tagname;
      tag_div.className = tagname + "_ch";
      tag_div.addEventListener("click", function (e) {
        e.currentTarget.classList.toggle("active");
        if (hasClass(e.currentTarget, "active")) {
          selectedTag.push(tagname);
          clickTag(selectedTag);
        } else {
          let index = selectedTag.indexOf(
            e.currentTarget.innerText.replace("#", " ").trim()
          );
          console.log(index);
          selectedTag.splice(index, 1);
          clickTag(selectedTag);
        }
      });
      4;
      tag_div.style.padding = "2px 3px";
      tag_div.style.marginRight = "5px";
      if (i >= 8) {
        tag_div.style.display = "none";
      }
      tag_ch.appendChild(tag_div);
    }
    for (let i = 1; i <= Object.keys(tags).length; i++) {
      addTag(tags[i], i);
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
  } else {
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

//검색기능 구현하기
async function searchOp_ch() {
  const search = document.querySelector("#searchcontent_ch");
  try {
    const response = await axios({
      method: "GET",
      url: `/project-list/search?value=${search.value}`,
      data: { data: search.value },
    });
    const elementsToRemove = document.querySelectorAll(".searchctn_ch");
    elementsToRemove.forEach((element) => {
      element.remove(); // 요소 삭제
    });
    count = 0;
    count_ch = 0;
    for (key in response.data.sendData) {
      if (count_ch % 5 == 0) {
        let searchctn_ch = document.createElement("div");
        searchctn_ch.classList.add("searchctn_ch", count + "_ch");
        document.querySelector("section").appendChild(searchctn_ch);
        count += 1;
      }
      let section = document.getElementsByClassName(count - 1 + "_ch");
      let content_ch = document.createElement("div");
      if (response.data.sendData[key][0] == null) {
        content_ch.innerHTML = `
      <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLMMS0tZyqfTuSnDSIB6hSRZYfeBE7xsSxow&usqp=CAU"
                  alt="이미지"
                  class="sumnail_ch"
                />
                <div class="contentTitle_ch">${response.data.sendData[key][1]}</div>
                <div class="contentContent_ch">${response.data.sendData[key][2]}</div>`;
      } else {
        content_ch.innerHTML = `
      <img
                  src="${response.data.sendData[key][0]}"
                  alt="이미지"
                  class="sumnail_ch"
                />
                <div class="contentTitle_ch">${response.data.sendData[key][1]}</div>
                <div class="contentContent_ch">${response.data.sendData[key][2]}</div>`;
      }
      content_ch.className = "content_ch";
      content_ch.setAttribute("onclick", `movedetail(${key})`);
      content_ch.style.cursor = "pointer";
      section[0].appendChild(content_ch);
      count_ch += 1;
    }
  } catch (error) {
    console.log("프로젝트 리스트 검색 도중 에러", error);
  }
}

// 태그 검색시 실행함수
// 클래스이름 확인
function hasClass(element, className) {
  if (element.classList) {
    return element.classList.contains(className);
  } else {
    return !!element.className.match(
      new RegExp("(\\s|^)" + className + "(\\s|$)")
    );
  }
}

// 태그 클릭할때마다 이벤트
async function clickTag(selectedTag) {
  if (selectedTag.length != 0) {
    let response = await axios({
      method: "GET",
      url: `/project-list/tag?value=${selectedTag}`,
    });
    let result = response.data.result;
    let includetag = [];
    for (let i in result) {
      for (let j in selectedTag) {
        if (result[i].Tag.tag_name.includes(selectedTag[j])) {
          if (includetag.indexOf(i) == -1) {
            includetag.push(result[i].project_id);
          }
        }
      }
    }
    includetag = filterarr(includetag, selectedTag.length);
    //요소삭제
    const elementsToRemove = document.querySelectorAll(".searchctn_ch");
    elementsToRemove.forEach((element) => {
      element.remove(); // 요소 삭제
    });
    count = 0;
    count_ch = 0;
    for (let i of includetag) {
      for (let key in project) {
        if (project[key][2] == i) {
          if (count_ch % 5 == 0) {
            let searchctn_ch = document.createElement("div");
            searchctn_ch.classList.add("searchctn_ch", count + "_ch");
            document.querySelector("section").appendChild(searchctn_ch);
            count += 1;
          }
          let section = document.getElementsByClassName(count - 1 + "_ch");
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
      }
    }
  } else {
    //요소삭제
    const elementsToRemove = document.querySelectorAll(".searchctn_ch");
    elementsToRemove.forEach((element) => {
      element.remove(); // 요소 삭제
    });
    count = 0;
    count_ch = 0;
    for (const key in project) {
      if (count_ch % 5 == 0) {
        let searchctn_ch = document.createElement("div");
        searchctn_ch.classList.add("searchctn_ch", count + "_ch");
        document.querySelector("section").appendChild(searchctn_ch);
        count += 1;
      }
      let section = document.getElementsByClassName(count - 1 + "_ch");
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
  }
}

//태그 검색시 사용
//includetag길이 만큼 나오는지 확인하는 함슈
function filterarr(arr, leng) {
  let result = arr.reduce((acc, curr) => {
    if (acc.get(curr) === undefined) {
      acc.set(curr, 1);
    } else {
      acc.set(curr, acc.get(curr) + 1);
    }
    return acc;
  }, new Map());
  let filtered_array = [];
  for (let [key, value] of result.entries()) {
    if (value >= leng) {
      filtered_array.push(key);
    }
  }
  return filtered_array;
}
