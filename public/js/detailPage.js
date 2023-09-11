document.addEventListener("DOMContentLoaded", async function () {
  const commentWrite = document.querySelector(".comment");

  const res = await axios({
    method: "GET",
    url: "/detailPage/review",
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
    url: "/detailPage/community/write",
  });
  console.log(commures.data.data);
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
      url: "/detailPage/review",
      data: { commentWrite: commentWrite.value },
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
    url: "/detailPage/community/write",
    data: {
      community: text,
    },
  }).then((response) => {
    editor.setMarkdown("");
    modal.style.display = "none";
  });
}
