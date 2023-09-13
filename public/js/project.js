// 에디터 구성
const editor = new toastui.Editor({
  el: document.querySelector("#editor"),
  previewStyle: "vertical",
  height: "100vh",
  toolbarItems: [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
    ["scrollSync"],
  ],
  placeholder:
    "당신의 작품들을 뽐내보세요.(첫번째 이미지는 프로젝트의 썸네일로 사용됩니다.)",
});
//에디터 이미지 업로드 처리
let imageArr = []; //이미지 저장변수
editor.addHook("addImageBlobHook", async (blob, cb) => {
  const formData = new FormData();
  formData.append("data", blob);
  console.log(formData);
  try {
    const response = await axios({
      method: "POST",
      url: `/api/project/img/write`,
      headers: {
        "Cache-Control": "no-cache",
      },
      data: formData,
    });
    imageArr.push(response.data.imageUrl);
    console.log(response.data.imageUrl);
    cb(response.data.imageUrl, "이미지");
  } catch (error) {
    console.log("S3업로드 중 오류 발생", error);
  }
});

//비디오 업로드
const videoInput = document.getElementById("video-upload");
const videoList = document.getElementById("video-list");
let videoUrl; //비디오업로드된 url 변수

videoInput.addEventListener("change", async function () {
  const selectedFiles = videoInput.files;

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    const fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > 100) {
      alert(`파일 ${file.name}은(는) 100MB를 초과합니다. 업로드하지 않습니다.`);
    } else {
      const listItem = document.createElement("div");
      listItem.textContent = `${file.name} (${fileSizeInMB.toFixed(2)} MB)`;

      // 파일 삭제 버튼 추가
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "삭제";
      deleteButton.addEventListener("click", function () {
        listItem.remove(); // 목록에서 삭제
        videoInput.value = ""; // 파일 선택 취소
      });
      listItem.appendChild(deleteButton);
      while (videoList.firstChild) {
        videoList.removeChild(videoList.firstChild);
      }
      videoList.appendChild(listItem);
      try {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios({
          method: "POST",
          url: "/api/project/video/upload",
          headers: {
            "content-type": "multipart/form-data",
          },
          data: formData,
        });
        videoUrl = response.data.imageUrl;
        console.log("들어온 정보", response.data.imageUrl);
      } catch (error) {
        console.log("동영상 S3업로드 중 에러 발생", error);
      }
    }
  }
});

// 태그 설정
const tagSection = document.querySelector(".tag_view_ch");
const inputTag = document.querySelector("#project_tag_ch");

inputTag.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTag(e);
  }
});
let tags = [];
let count = 0;
function addTag(e) {
  e.preventDefault();
  const tagText = inputTag.value.trim().toUpperCase();
  if (tagText !== "") {
    if (tags.includes(tagText) === false) {
      tags.push(tagText);
      const tag_div = document.createElement("div");
      tag_div.innerText = "#" + tagText;
      tag_div.style.padding = "4px 4px";
      tag_div.style.border = "none";
      tag_div.style.borderRadius = "10px";
      tag_div.style.backgroundColor = "#ffd95a";
      tag_div.style.margin = "0px 5px";
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "X";
      deleteButton.style.border = "none";
      deleteButton.style.backgroundColor = "#ffd95a";
      deleteButton.style.cursor = "pointer";

      deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        const text = e.target.parentElement.innerText.substring(
          1,
          e.target.parentElement.innerText.length - 1
        );
        tagSection.removeChild(tag_div);
        tags = tags.filter((element) => element !== text);
      });

      tag_div.appendChild(deleteButton);
      tagSection.appendChild(tag_div);
      inputTag.value = "";
    } else {
      alert("이미 입력한 태그 입니다.");
      inputTag.value = "";
    }
  } else {
    alert("태그에 값을 입력해주세요");
  }
}
// 프로젝트 업로드
let cookie = document.cookie;
const [name_ch, value_ch] = cookie.trim().split("=");
async function upload_ch() {
  const form = document.forms["project_form_ch"];
  let text = editor.getHTML();
  let data = {
    title: form.project_title_ch.value,
    tags: tags,
    period: form.project_period_ch.value,
    git: form.project_git_ch.value,
    member: form.project_member_ch.value,
    content: text,
    video: videoUrl,
    thumnail: imageArr[0],
    front_num: form.front_num_ch.value,
    back_num: form.back_num_ch.value,
  };
  try {
    const response = await axios({
      method: "POST",
      url: "/api/project/write",
      data,
      headers: {
        Authorization: `Bearer ${value_ch}`, // JWT를 'Bearer' 스킴으로 포함
        "Content-Type": "application/json", // 요청 본문의 타입 설정 (예시)
      },
    });
    window.location.href = "/project-list";
  } catch (error) {
    console.log("프로젝트 업로드 중 에러 발생", error);
  }
}
