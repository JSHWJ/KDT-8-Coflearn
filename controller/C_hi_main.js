const db = require("../models");
const models = db.User;
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

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
  //console.log(project_id);
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
  console.log("debug", req.body);
  const project_id = req.params.id;

  const project = await models.Project.findOne({
    where: { project_id },
  });

  res.json({
    title: project.title,
    video: project.video,
    period: project.period,
    git_link: project.git_link,
    content: project.content,
    members: project.members,
  });
};

// 리뷰
const detailPost_review = (req, res) => {
  const projectid = req.body.project_id;

  const review_content = req.body.commentWrite;
  const token = req.headers.authorization.split(" ")[1];
  let decode;
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      // JWT 검증 실패
      res.status(401).json({ error: "JWT 검증 실패" });
    } else {
      // JWT 검증 성공, 디코딩된 정보는 decoded에 저장됨
      console.log("복호화 완료", decoded);
      decode = decoded;
    }
  });
  //console.log(review_content);

  models.Review.create({
    user_id: decode.user_id,
    project_id: projectid,
    review_content,
  });
  //console.log(review_content);

  res.json({ data: review_content, project_id: projectid, decode: decode });
};

const detailGet_review = async (req, res) => {
  //console.log(req.params);
  const projectid = req.params.id;

  const allReview = await models.Review.findAll({
    where: { project_id: projectid },
    attributes: ["review_content"],
    include: {
      model: models.User,
      attributes: ["nick_name"],
    },
  });

  //console.log(allReview);
  res.json({ data: allReview });
};

// 상세페이지 카트 담기
const detailPost_cart = async (req, res) => {
  const project_id = req.params.id;
  console.log("카트 : ", req.params.id);

  const token = req.headers.authorization.split(" ")[1];
  let decode;
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      // JWT 검증 실패
      res.status(401).json({ error: "JWT 검증 실패" });
    } else {
      // JWT 검증 성공, 디코딩된 정보는 decoded에 저장됨
      console.log("복호화 완료", decoded);
      decode = decoded;
    }
  });

  models.hi_Cart.create({
    user_id: decode.user_id,
    project_id: project_id,
  });
};

// 커뮤니티

const detailPost_community = async (req, res) => {
  const projectid = req.params.id;
  const community_content = req.body.community;

  const token = req.headers.authorization.split(" ")[1];
  let decode;
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      // JWT 검증 실패
      res.status(401).json({ error: "JWT 검증 실패" });
    } else {
      // JWT 검증 성공, 디코딩된 정보는 decoded에 저장됨
      console.log("복호화 완료", decoded);
      decode = decoded;
    }
  });

  const nowcommunity = await models.Community.create({
    user_id: decode.user_id,
    project_id: projectid,
    community_content,
  });
  //console.log(community_content);
  res.json({
    community_id: nowcommunity.community_id,
    community_content: nowcommunity.community_content,
    project_id: projectid,
    decode: decode,
  });
};
const detailGet_community = async (req, res) => {
  const projectid = req.params.id;

  const allCommunity = await models.Community.findAll({
    where: { project_id: projectid },
    attributes: ["community_content", "community_id"],
    include: {
      model: models.User,
      attributes: ["nick_name"],
    },
  });
  //console.log(allCommunity);
  res.json({ data: allCommunity });
};

///// 답글

const detailGet_reply = async (req, res) => {
  const project_id = req.params.id;

  const allReply = await models.Reply.findAll({
    where: { project_id: project_id },
    include: {
      model: models.User,
      attributes: ["nick_name"],
    },
  });

  res.json({ data: allReply });
};

const detailPost_reply = (req, res) => {
  const user_id = 1;
  const project_id = req.params.id;
  const reply_content = req.body.reply_content;
  const community_id = req.body.community_id;
  console.log("commu", community_id);
  const token = req.headers.authorization.split(" ")[1];
  let decode;
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      // JWT 검증 실패
      res.status(401).json({ error: "JWT 검증 실패" });
    } else {
      // JWT 검증 성공, 디코딩된 정보는 decoded에 저장됨
      console.log("복호화 완료", decoded);
      decode = decoded;
    }
  });

  console.log("decode", decode);

  models.Reply.create({
    user_id: decode.user_id,
    project_id: project_id,
    reply_content,
    community_id,
  });
  res.json({ data: reply_content, user_id, nick_name: decode.nick_name });
};

const detailGet_recoplearn = async (req, res) => {
  const project_id = req.params.id;

  const recoplearn = await models.Recoplearn.findAll({
    where: { project_id },
    attributes: ["frontability", "backability", "recoplearn_goal"],
  });
  res.json({ data: recoplearn });
};

// 상세페이지 유저 불러오기
const detailGet_user = async (req, res) => {
  const user_id = 1;
  //const user_id = req.params.id;
  const user = await models.User.findOne({
    where: { user_id },
    attributes: ["user_id", "nick_name", "email"],
  });

  console.log(userJson);
  res.json({ user: userJson });
};

/////////////////////////////////
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
  detailGet_recoplearn,
  detailPage_tags,
  detailGet_intro,
  detailGet_reply,
  detailPost_review,
  detailGet_review,
  detailPost_community,
  detailGet_community,
  detailPost_reply,
  detailGet_user,
  detailPost_cart,
};
