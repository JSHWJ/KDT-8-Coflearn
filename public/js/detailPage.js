const currentUrl = window.location.href;
let num = currentUrl.replace("http://localhost:8000/detailPage/", "");

document.addEventListener("DOMContentLoaded", async function () {
  const currentUrl = window.location.href;
  let num = currentUrl.replace("http://localhost:8000/detailPage/", "");
  const commentWrite = document.querySelector(".comment");

  // 프로젝트 소개 탭
  const projectDetail = await axios({
    method: "GET",
    url: `/detailPage/${num}/intro`,
    data: { num },
  });

  const title = document.querySelector("#project_title");
  const member = document.querySelector("#member_hi");
  const period = document.querySelector("#period_hi");
  const link = document.createElement("a");
  const content = document.querySelector("#exContent_hi");
  const link_hi = document.querySelector("#link_hi");
  link.setAttribute("id", "gitlink_hi");
  link.setAttribute("href", `Link ${projectDetail.data.git_link}`);
  link.setAttribute("target", "_blank");
  title.textContent = projectDetail.data.title;
  member.textContent = projectDetail.data.members;
  period.textContent = projectDetail.data.period + "일";
  link.textContent = projectDetail.data.git_link;
  content.innerHTML = projectDetail.data.content;

  link_hi.appendChild(link);

  // 태그 GET
  const tagres = await axios({
    method: "GET",
    url: `/detailPage/${num}/tags`,
    data: { num },
  });

  console.log(tagres.data.tagName);

  const tag = document.querySelector("#tag_hi");
  const tagSpan = document.createElement("span");

  for (let i = 0; i < tagres.data.tagName.length; i++) {
    tag.textContent = "#" + tagres.data.tagName[i];
  }

  // 리뷰 탭 GET
  const res = await axios({
    method: "GET",
    url: `/detailPage/${num}/review`,

    data: { num },

  });
  //console.log(res.data.data);

  const all = document.querySelector(".allComment_hi");
  for (let i = res.data.data.length - 1; i >= 0; i--) {
    const ReviewdivTag = document.createElement("div");
    const p = document.createElement("p");

    ReviewdivTag.className = "crewComment_hi";

    p.innerText = res.data.data[i].review_content;
    p.style.width = "200px";

    ReviewdivTag.appendChild(p);

    all.appendChild(ReviewdivTag);
  }

  const allcom = document.querySelector(".allCommunity");

  const commures = await axios({
    method: "GET",
    url: `/detailPage/${num}/community/write`,
    data: { num },
  });
  for (let i = commures.data.data.length - 1; i >= 0; i--) {
    const divTag = document.createElement("div");
    const p = document.createElement("p");
    const replyButton = document.createElement("button");
    divTag.className = "communityContent";
    replyButton.className = "replyButton";
    p.innerHTML = commures.data.data[i].community_content;
    p.style.width = "200px";
    replyButton.style.width = "300px";
    replyButton.textContent = "답글 달기";
    divTag.appendChild(p);
    divTag.appendChild(replyButton);
    allcom.appendChild(divTag);
  }
});

// const tab = document.getElementsByClassName("tabs_hi");

document
  .getElementsByClassName("tabs_hi")[0]
  .addEventListener("click", function (e) {
    e.currentTarget.classList.toggle("active");
  });

async function reviewFunc() {
  const commentWrite = document.querySelector(".comment");

  try {
    const res = await axios({
      method: "POST",
      url: `/detailPage/${num}/review`,
      data: {
        project_id: num,
        commentWrite: commentWrite.value,
      },
    });
    commentWrite.value = "";

    const newReview = res.data.data;

    const all = document.querySelector(".allComment_hi");
    const divTag = document.createElement("div");
    divTag.className = "crewComment_hi";
    const p = document.createElement("p");
    p.innerText = newReview;
    p.style.width = "200px";
    console.log(p);
    divTag.prepend(p);
    all.prepend(divTag);
  } catch (error) {
    console.error("Error submitting review: ", error);
  }
}

async function writeCommunity_hi() {
  const text = editor.getHTML();

  // 추가된 글을 먼저 표시
  const allcom = document.querySelector(".allCommunity");
  const divTag = document.createElement("div");
  const replyButton = document.createElement("button");
  const p = document.createElement("p");
  replyButton.className = "replyButton";
  divTag.className = "communityContent";
  p.innerHTML = text;
  p.style.width = "200px";
  replyButton.style.width = "300px";
  replyButton.textContent = "답글 달기";
  divTag.appendChild(p);
  divTag.appendChild(replyButton);
  allcom.prepend(divTag);
  const res = await axios({
    method: "POST",
    url: `/detailPage/${num}/community/write`,
    data: {
      community: text,
    },
  }).then((response) => {
    editor.setMarkdown("");
    modal.style.display = "none";
  });
}
