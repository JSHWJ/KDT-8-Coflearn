const db = require("../models");
const models = db.User;

console.log(models);

//마이페이지
const mypage = (req, res) => {
  res.render("mypage");
};

// 프로젝트리스트 페이지
const projectlist = (req, res) => {
  res.render("projectlist");
};

//프로젝트 목록 페이지 데이터 가져오기
const projectlist_post = async (req, res) => {
  try {
    let sendInfo = {};
    let arr = {};
    let arr2 = {};
    const response = await Promise.all([
      models.Project.findAll(),
      models.Tag.findAll(),
    ]);
    response[0].forEach((project) => {
      arr[project.title] = project.members;
    });
    response[1].forEach((tag) => {
      arr2[tag.tag_id] = tag.tag_name;
    });
    sendInfo.title = arr;
    sendInfo.tag = arr2;
    console.log("이게뭐지", sendInfo);
    res.json({ data: sendInfo });
  } catch (error) {
    console.error("Sequelize에러 발생: ", error);
  }
};

// 리코프런리스트 페이지
const recoplearnlist = (req, res) => {
  res.render("recoplearn");
};

//리코프런 목록 페이지 데이터 가져오기
const recoplearnlist_post = async (req, res) => {
  try {
    let sendInfo = {};
    let arr = {};
    let arr2 = {};
    const response = await Promise.all([
      models.Recoplearn.findAll({
        include: {
          model: models.Project,
          attributes: ["title"],
        },
      }),
      models.Tag.findAll(),
    ]);
    response[0].forEach((item) => {
      arr[item.Project.title] = {
        front_num: item.font_num,
        back_num: item.back_num,
        current_num: item.current_num,
        goal_num: item.goal_num,
      };
    });
    response[1].forEach((tag) => {
      arr2[tag.tag_id] = tag.tag_name;
    });
    sendInfo.project = arr;
    sendInfo.tag = arr2;
    res.json({ data: sendInfo });
  } catch (error) {
    console.error("Sequelize에러 발생: ", error);
  }
};

//프로젝트 업로드 페이지
const project = (req, res) => {
  res.render("project");
};

//프로젝트 업로드 하기
const project_upload = async (req, res) => {
  try {
    const newProject = {
      title: req.body.title,
      content: req.body.content,
      video: req.body.video,
      pariod: req.body.period,
      members: req.body.member,
      git_link: req.body.git,
    };
    const response = await models.Project.create(newProject);
    console.log("새로운프로젝트가 추가되었습니다.");
    res.json({ result: true });
  } catch (error) {
    console.log("프로젝트 추가중 오류 발생", error);
  }
};

//메인페이지
const main = (req, res) => {
  res.render("main");
};

//상세페이지
const detail = (req, res) => {
  res.render("detailPage");
};

const signup = (req, res) => {
  res.render("signup");
};

const login_modal = (req, res) => {
  res.render("login_modal");
};
// 상세 페이지
const detailPage = (req, res) => {
  res.render("detailPage");
};
module.exports = {
  projectlist,
  projectlist_post,
  recoplearnlist,
  recoplearnlist_post,
  project_upload,
  project,
  main,
  detail,
  login_modal,
  detailPage,
  signup,
  mypage,
};
