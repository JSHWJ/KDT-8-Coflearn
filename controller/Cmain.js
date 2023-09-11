const db = require("../models");
const models = db.User;

// console.log(models);

//마이페이지
const mypage = (req, res) => {
  res.render("mypage");
};

// 프로젝트리스트 페이지
const projectlist = (req, res) => {
  res.render("projectlist");
};
// 리코프런리스트 페이지
const recoplearnlist = (req, res) => {
  res.render("recoplearn");
};

//프로젝트 업로드 페이지
const project = (req, res) => {
  res.render("project");
};

//메인페이지
const main = (req, res) => {
  res.render("main");
};

//상세페이지
const detail = (req, res) => {
  models.User.findAll().then((result) => {
    console.log();
    res.render("detailPage", { result: result[0].nick_name });
  });
};

const detailPost_review = (req, res) => {
  const projectid = 1;
  const userid = 1;
  const review_content = req.body.commentWrite;

  //console.log(review_content);

  models.Review.create({
    user_id: userid,
    project_id: projectid,
    review_content,
  });
  //console.log(review_content);
  res.json({ data: review_content });
};

const detailGet_review = async (req, res) => {
  const allReview = await models.Review.findAll({});
  console.log(allReview);
  res.json({ data: allReview });
};

const detailPost_community = (req, res) => {
  const projectid = 1;
  const userid = 1;
  const community_content = req.body.community;

  models.Community.create({
    user_id: userid,
    project_id: projectid,
    community_content,
  });
  //console.log(community_content);
  res.json({ community_content: community_content });
};

const detailGet_community = async (req, res) => {
  const allCommunity = await models.Community.findAll({});
  console.log(allCommunity);
  res.json({ data: allCommunity });
};

const signup = (req, res) => {
  res.render("signup");
};

const login_modal = (req, res) => {
  res.render("login_modal");
};
module.exports = {
  projectlist,
  recoplearnlist,
  project,
  main,
  detail,
  login_modal,
  signup,
  mypage,
  detailPost_review,
  detailGet_review,
  detailPost_community,
  detailGet_community,
};
