const currentUrl = window.location.href;
let num = currentUrl.replace("http://15.164.79.184/detailPage/", "");

let cookie = document.cookie;
const [name_ch, value_ch] = cookie.trim().split("=");

document.addEventListener("DOMContentLoaded", async function () {
  const currentUrl = window.location.href;
  let num = currentUrl.replace("http://15.164.79.184/detailPage/", "");
  const commentWrite = document.querySelector(".comment");

  // 상세페이지 유저 정보 불러오기

  // 프로젝트 소개 탭
  const projectDetail = await axios({
    method: "GET",
    url: `/detailPage/${num}/intro`,
    data: { num },
  });
  //console.log("qwd", projectDetail.data.video);
  const video = document.querySelector("#video_hi");
  video.setAttribute("src", projectDetail.data.video);
  const title = document.querySelector("#project_title");
  const member = document.querySelector("#member_hi");
  const period = document.querySelector("#period_hi");
  const link = document.createElement("a");
  const content = document.querySelector("#exContent_hi");
  const link_hi = document.querySelector("#link_hi");
  link.setAttribute("id", "gitlink_hi");
  link.setAttribute("href", `Link ${projectDetail.data.git_link}`);
  link.setAttribute("target", "_blank");
  video.innerHTML = projectDetail.data.video;
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
    nickName.innerHTML = res.data.data[i].User.nick_name + " 크루";
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
  console.log("qweqeqweqw", commures);
  const replyModal = document.querySelector("#replyModal");

  for (let i = commures.data.data.length - 1; i >= 0; i--) {
    const nickName = document.createElement("div");
    const divTag = document.createElement("div");
    const p = document.createElement("p");
    const replyButton = document.createElement("button");
    divTag.className = "communityContent";
    replyButton.className = "replyButton";

    const communityId = commures.data.data[i].community_id;
    console.log(communityId);
    // replyModal.setAttribute("value", communityId);
    divTag.setAttribute("data-community-id", communityId);
    nickName.innerHTML = commures.data.data[i].User.nick_name + " 크루";
    p.innerHTML = `${commures.data.data[i].community_content}<hr>`;
    p.style.width = "200px";
    replyButton.style.width = "100px";
    replyButton.textContent = "답글 달기";
    divTag.appendChild(nickName);
    divTag.appendChild(p);
    divTag.appendChild(replyButton);
    allcom.appendChild(divTag);
  }

  const replyGet = await axios({
    method: "GET",
    url: `/detailPage/${num}/community/reply`,
    data: { num },
  });
  const commuElems = document.querySelectorAll(".communityContent");

  for (let i = 0; i < commuElems.length; i++) {
    const commuElem = commuElems[i];
    const getCommuId = Number(commuElem.getAttribute("data-community-id"));

    for (let j in replyGet.data.data) {
      if (getCommuId === replyGet.data.data[j].community_id) {
        console.log("reply");
        const replyText = document.createElement("p");
        // 답글 내용을 생성한 p 요소에 추가
        replyText.textContent =
          replyGet.data.data[j].User.nick_name +
          " 크루 : " +
          replyGet.data.data[j].reply_content;

        // 해당 커뮤니티 게시물에 추가
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

async function CartFunc() {
  alert("프로젝트가 담겼습니다.");
  await axios({
    method: "POST",
    url: `/detailPage/${num}/addCart`,
    data: {
      project_id: num,
    },
    headers: {
      Authorization: `Bearer ${value_ch}`, // JWT를 'Bearer' 스킴으로 포함
      "Content-Type": "application/json", // 요청 본문의 타입 설정 (예시)
    },
  });
}

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
      headers: {
        Authorization: `Bearer ${value_ch}`, // JWT를 'Bearer' 스킴으로 포함
        "Content-Type": "application/json", // 요청 본문의 타입 설정 (예시)
      },
    });
    commentWrite.value = "";
    console.log("q", res.data.decode.nick_name);
    const newReview = res.data.data;

    const all = document.querySelector(".allComment_hi");
    const divTag = document.createElement("div");
    divTag.className = "crewComment_hi";
    const p = document.createElement("p");
    p.innerText = newReview;
    p.style.width = "200px";

    divTag.prepend(p);
    divTag.prepend(res.data.decode.nick_name + "  크루");
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

  replyButton.style.width = "100px";

  replyButton.textContent = "답글 달기";

  // Send POST request to the server
  const res = await axios({
    method: "POST",
    url: `/detailPage/${num}/community/write`,
    data: { community: text },
    headers: {
      Authorization: `Bearer ${value_ch}`, // JWT를 'Bearer' 스킴으로 포함
      "Content-Type": "application/json", // 요청 본문의 타입 설정 (예시)
    },
  });

  console.log("wd", res.data.decode.nick_name);

  if (res.data) {
    // Attach returned community_id to the div tag as a data attribute
    divTag.setAttribute("data-community-id", res.data.community_id);

    divTag.textContent = res.data.decode.nick_name + " 크루";
    divTag.appendChild(p);
    divTag.appendChild(replyButton);

    allcom.prepend(divTag);

    editor.setMarkdown("");
    modal.style.display = "none";
  } else {
    console.error("Failed to post the community content");
  }
}

// async function submitReply() {
//   const replyContent = document.querySelector("#replyContent").value;
//   const modalidget = document.querySelector("#replyModal");
//   const comid = Number(modalidget.getAttribute("data-modal-id"));

//   // 커뮤니티 게시물의 고유한 ID를 가져오는 코드 (예시로 데이터 속성 data-community-id를 사용)
//   console.log("comid", comid);

//   // 서버로부터 답글 데이터를 받아온 후
//   // const res = await axios({
//   //   method: "POST",
//   //   url: `/detailPage/${num}/community/reply`,
//   //   data: {
//   //     reply_content: replyContent,
//   //     community_id: comid,
//   //   },
//   //   headers: {
//   //     Authorization: `Bearer ${value_ch}`,
//   //     "Content-Type": "application/json",
//   //   },
//   // });

//   // console.log(res);

//   // if (res.data) {
//   //   // 서버에서 받은 답글 데이터
//   //   const newReplyData = res.data;

//   //   // 해당 커뮤니티 게시물을 식별하는 방법 (예: 커뮤니티 ID)
//   //   const communityIdToMatch = comid;

//   //   // 커뮤니티 게시물을 식별하고, 해당 게시물에 답글을 추가
//   //   const commuElems = document.querySelectorAll(".communityContent");

//   //   for (let i = 0; i < commuElems.length; i++) {
//   //     const commuElem = commuElems[i];
//   //     const getCommuId = Number(commuElem.getAttribute("data-community-id"));

//   //     if (getCommuId === communityIdToMatch) {
//   //       console.log("reply");

//   //       // 새로운 답글 요소를 생성
//   //       const replyText = document.createElement("p");
//   //       replyText.textContent = `${newReplyData.user_name} 크루 : ${newReplyData.reply_content}`;

//   //       // 해당 커뮤니티 게시물에 답글을 추가
//   //       commuElem.appendChild(replyText);
//   //     }
//   //   }
//   // }

//   //divTag.appendChild(reviewText);

//   // 답글을 작성한 후에 모달을 닫을 수 있도록
//   closeReplyModal();
// }

// Reply post 부분에서 사용자 정보 가져오기
async function submitReply() {
  const replyContent = document.querySelector("#replyContent").value;
  const modalidget = document.querySelector("#replyModal");
  const comid = Number(modalidget.getAttribute("data-modal-id"));

  // 사용자 정보 가져오기
  const userRes = await axios({
    method: "GET",
    url: `/detailPage/${num}/community/reply`,
    data: { num },
  });

  console.log(userRes);

  if (userRes.data) {
    const res = await axios({
      method: "POST",
      url: `/detailPage/${num}/community/reply`,
      data: {
        reply_content: replyContent,
        community_id: comid,
      },
      headers: {
        Authorization: `Bearer ${value_ch}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data) {
      // 서버에서 받은 답글 데이터
      const newReplyData = res.data;

      const communityIdToMatch = comid;

      const commuElems = document.querySelectorAll(".communityContent");

      for (let i = 0; i < commuElems.length; i++) {
        const commuElem = commuElems[i];
        const getCommuId = Number(commuElem.getAttribute("data-community-id"));

        if (getCommuId === communityIdToMatch) {
          console.log("reply");

          const replyText = document.createElement("p");
          replyText.textContent = `${userRes.data.data[i].User.nick_name} 크루 : ${replyContent}`;

          commuElem.appendChild(replyText);
        }
      }
    }
  } else {
    console.error("Failed to fetch user information");
  }

  //divTag.appendChild(reviewText);

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
    console.log("이거 나옴?", e.target.closest(".communityContent"));
    const communityId = e.target
      .closest(".communityContent")
      .getAttribute("data-community-id");
    console.log("communityId", communityId);
    openReplyModal(communityId);
  }
});
