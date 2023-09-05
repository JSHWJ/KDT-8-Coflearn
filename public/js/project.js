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
  placeholder: "당신의 작품들을 뽐내보세요.",
});

const videoInput = document.getElementById("video-upload");
const videoList = document.getElementById("video-list");

videoInput.addEventListener("change", function () {
  const selectedFiles = videoInput.files;

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    const fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > 20) {
      alert(`파일 ${file.name}은(는) 20MB를 초과합니다. 업로드하지 않습니다.`);
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
      videoList.appendChild(listItem);
    }
  }
});

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
  const tagText = inputTag.value.trim();
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
        tagSection.removeChild(tag_div);
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
function upload_ch() {
  window.location.href = "/project-list";
}
