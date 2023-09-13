const currentUrl = window.location.href;
let num = currentUrl.replace("http://localhost:8000/detailPage/", "");

document.addEventListener("DOMContentLoaded", async function () {
  const currentUrl = window.location.href;
  let num = currentUrl.replace("http://localhost:8000/detailPage/", "");
  const commentWrite = document.querySelector(".comment");

  // 상세페이지 유저 정보 불러오기
  const detailUser = await axios({
    method: "GET",
    url: `/detailPage/${num}/user`,
    data: { num },
  });

  console.log("user:", detailUser.data.user.nick_name);

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

  const tag = document.querySelector("#tag_hi");
  const tagSpan = document.createElement("span");

  for (let i = 0; i < tagres.data.tagName.length; i++) {
    tag.textContent += "#" + tagres.data.tagName[i];
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
    const nickName = document.createElement("div");
    const ReviewdivTag = document.createElement("div");
    const p = document.createElement("p");

    ReviewdivTag.className = "crewComment_hi";
    nickName.innerHTML = detailUser.data.user.nick_name + " 크루";
    p.innerText = res.data.data[i].review_content;
    p.style.width = "200px";

    ReviewdivTag.appendChild(p);
    ReviewdivTag.prepend(nickName);
    all.appendChild(ReviewdivTag);
  }

  const allcom = document.querySelector(".allCommunity");

  const commures = await axios({
    method: "GET",
    url: `/detailPage/${num}/community/write`,
    data: { num },
  });

  const replyModal = document.querySelector("#replyModal");

  for (let i = commures.data.data.length - 1; i >= 0; i--) {
    const divTag = document.createElement("div");
    const p = document.createElement("p");
    const replyButton = document.createElement("button");
    divTag.className = "communityContent";
    replyButton.className = "replyButton";
    const communityId = commures.data.data[i].community_id;
    console.log(communityId);
    // replyModal.setAttribute("value", communityId);
    divTag.setAttribute("data-commnunity-id", communityId);
    p.innerHTML = commures.data.data[i].community_content;
    p.style.width = "200px";
    replyButton.style.width = "100px";
    replyButton.textContent = "답글 달기";
    divTag.appendChild(p);
    divTag.appendChild(replyButton);
    allcom.appendChild(divTag);
  }

  const replyGet = await axios({
    method: "GET",
    url: `/detailPage/${num}/community/reply`,
    data: { num },
  });
  console.log(replyGet);
  const commuElems = document.querySelectorAll(".communityContent");

  for (let commuElem of commuElems) {
    const getCommuId = Number(commuElem.getAttribute("data-commnunity-id"));

    for (let i in replyGet.data.data) {
      if (getCommuId === replyGet.data.data[i].community_id) {
        const replyText = document.createElement("p");
        replyText.innerHTML = replyGet.data.data[i].reply_content;
        commuElem.appendChild(replyText);
      }
    }
  }

  const reGet = await axios({
    method: "GET",
    url: `/detailPage/${num}/recoplearn`,
    data: { num },
  });

  console.log("dd", reGet.data.data);
  const frontText = document.querySelector("#frontText_hi");
  const backText = document.querySelector("#backText_hi");
  const goalText = document.querySelector("#goalText_hi");
  const reco = document.querySelector(".recoplearndiv");

  try {
    if (frontText) {
      frontText.textContent = reGet.data.data[0].frontability;
    }
    if (backText) {
      backText.textContent = reGet.data.data[0].backability;
    }
    if (goalText) {
      goalText.textContent = reGet.data.data[0].recoplearn_goal;
    }
  } catch (error) {
    reco.textContent = "아직 리코프런이 생성되지 않았습니다.";
    reco.style.margin = "auto";
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

  replyButton.style.width = "30px";

  replyButton.textContent = "답글 달기";

  // Send POST request to the server
  const res = await axios({
    method: "POST",
    url: `/detailPage/${num}/community/write`,
    data: { community: text },
  });

  if (res.status === 200 && res.data) {
    // Attach returned community_id to the div tag as a data attribute
    divTag.setAttribute("data-community-id", res.data.community_id);

    divTag.appendChild(p);
    divTag.appendChild(replyButton);

    allcom.prepend(divTag);

    editor.setMarkdown("");
    modal.style.display = "none";
  } else {
    console.error("Failed to post the community content");
  }
}

async function submitReply() {
  const replyContent = document.querySelector("#replyContent").value;
  const modalidget = document.querySelector("#replyModal");
  const comid = Number(modalidget.getAttribute("data-modal-id"));

  // 커뮤니티 게시물의 고유한 ID를 가져오는 코드 (예시로 데이터 속성 data-community-id를 사용)
  console.log("comid", comid);
  await axios({
    method: "POST",
    url: `/detailPage/${num}/community/reply`,
    data: {
      reply_content: replyContent,
      community_id: comid,
    },
  }).catch((error) => {
    console.error("Error submitting reply: ", error);
  });

  // 답글을 작성한 후에 모달을 닫을 수 있도록
  closeReplyModal();
}

// 커뮤니티 답글
function openReplyModal(communityId) {
  const replyModal = document.getElementById("replyModal");
  replyModal.setAttribute("data-modal-id", communityId);

  replyModal.style.display = "block";
}

// 모달 창 닫기
function closeReplyModal() {
  const replyModal = document.getElementById("replyModal");
  replyModal.style.display = "none";
}

document.querySelector(".allCommunity").addEventListener("click", function (e) {
  if (e.target && e.target.className == "replyButton") {
    const communityId = e.target
      .closest(".communityContent")
      .getAttribute("data-commnunity-id");
    console.log("communityId", communityId);
    openReplyModal(communityId);
  }
});
