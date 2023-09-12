const db = require("../models");
const models = db.User;

// console.log(models);

//마이페이지
const mypage = (req, res) => {
  res.render("mypage");
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

const detailPage_tags = async (req, res) => {
  const tagName = [];
  const project_id = req.params.id;
  console.log(project_id);
  const tags = await models.ProjectTag.findAll({
    where: { project_id },
    include: {
      model: models.Tag,
      attributes: ["tag_name"],
    },
  });
  tags.forEach((item) => {
    tagName.push(item.Tag.tag_name);
  });
  res.json({ tagName });
};

// 프로젝트 소개
const detailGet_intro = async (req, res) => {
  const project_id = req.params.id;

  const project = await models.Project.findOne({
    where: { project_id },
  });

  res.json({
    title: project.title,
    period: project.period,
    git_link: project.git_link,
    content: project.content,
    members: project.members,
  });
};

// 리뷰
const detailPost_review = (req, res) => {
  const userid = 1;
  const projectid = req.body.project_id;

  const review_content = req.body.commentWrite;

  //console.log(review_content);

  models.Review.create({
    user_id: userid,
    project_id: projectid,
    review_content,
  });
  //console.log(review_content);

  res.json({ data: review_content, project_id: projectid });
};

const detailGet_review = async (req, res) => {
  console.log(req.params);
  const projectid = req.params.id;

  const allReview = await models.Review.findAll({
    where: { project_id: projectid },
    attributes: ["review_content"],
  });

  console.log(allReview);
  res.json({ data: allReview });
};

// 커뮤니티

const detailPost_community = (req, res) => {
  const projectid = req.params.id;

  const userid = 1;
  const community_content = req.body.community;

  models.Community.create({
    user_id: userid,
    project_id: projectid,
    community_content,
  });
  //console.log(community_content);

  res.json({ community_content: community_content, project_id: projectid });
};
const detailGet_community = async (req, res) => {
  const projectid = req.params.id;

  const allCommunity = await models.Community.findAll({
    where: { project_id: projectid },
    attributes: ["community_content"],
  });
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
  main,
  detail,
  login_modal,
  signup,
  mypage,

  detailPage_tags,
  detailGet_intro,

  detailPost_review,
  detailGet_review,
  detailPost_community,
  detailGet_community,
};
