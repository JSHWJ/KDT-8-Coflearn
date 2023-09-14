const db = require("../models");
const models = db.User;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { SECRET } = process.env;
console.log(models);

//로그아웃
const logout = (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("csrf_token ");
  res.clearCookie("isLoggedIn").redirect("/main");
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
      arr[project.title] = [
        project.members,
        project.thumnail,
        project.project_id,
      ];
    });
    response[1].forEach((tag) => {
      arr2[tag.tag_id] = tag.tag_name;
    });
    sendInfo.title = arr;
    sendInfo.tag = arr2;
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
          attributes: ["title", "thumnail"],
        },
      }),
      models.Tag.findAll(),
    ]);
    response[0].forEach((item) => {
      arr[item.Project.title] = {
        front_num: item.front_num,
        back_num: item.back_num,
        current_num: item.current_num,
        goal_num: item.goal_num,
        thumnail: item.Project.thumnail,
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
      // res.json({ message: "JWT 검증 성공", decoded });
    }
  });
  const {
    title,
    content,
    video,
    period,
    member,
    git,
    tags,
    thumnail,
    front_num,
    back_num,
  } = req.body;
  try {
    const newProject = {
      title: title,
      content: content,
      video: video,
      period: period,
      members: member,
      git_link: git,
      thumnail: thumnail,
      frontnum: front_num,
      backnum: back_num,
    };
    await models.Project.create(newProject);
    let project = await models.Project.findOne({ where: { title: title } });
    if (tags && tags.length > 0) {
      for (const item of tags) {
        let taged = await models.Tag.findOne({ where: { tag_name: item } });
        if (!taged) {
          taged = await models.Tag.create({ tag_name: item });
        }
        await models.ProjectTag.create({
          project_id: project.project_id,
          tag_id: taged.tag_id,
        });
      }
    }
    const Myproject = {
      user_id: decode.user_id,
      project_id: project.project_id,
    };
    await models.MyProject.create(Myproject);
    console.log("새로운프로젝트가 추가되었습니다.");
    res.json({ result: true });
  } catch (error) {
    console.log("프로젝트 추가중 오류 발생", error);
  }
};

//리코프런 DB정보가져오기
const makerrecoplearn_post = async (req, res) => {
  console.log(req.body.num);
  const project = await models.Project.findOne({
    where: {
      project_id: req.body.num,
    },
  });
  let frontnum = project.frontnum;
  let backnum = project.backnum;
  res.json({ frontnum, backnum });
};

//리코프런 만들기
const makerecoplearn = async (req, res) => {
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

  const {
    project_id,
    front_num,
    back_num,
    front_goal_num,
    back_goal_num,
    current_num,
    goal_num,
    frontability,
    backability,
    recoplearn_goal,
  } = req.body;

  const newRecoplearn = {
    project_id: project_id,
    front_num: front_num,
    front_goal_num: front_goal_num,
    back_num: back_num,
    back_goal_num: back_goal_num,
    current_num: current_num,
    goal_num: goal_num,
    frontability: frontability,
    backability: backability,
    recoplearn_goal: recoplearn_goal,
  };
  const recoplearn = await models.Recoplearn.create(newRecoplearn);
  const userRecoplearn = {
    user_id: decode.user_id,
    Recoplearn_id: recoplearn.Recoplearn_id,
  };
  await models.UserRecoplearn.create(userRecoplearn);
  res.json({ result: true });
};

//리코프런 버튼 수정 하기
const updatebtn = async (req, res) => {
  const response = await models.Recoplearn.findOne({
    where: { project_id: req.body.num },
  });
  console.log("무슨값이 올까?", response);
  if (response == null) {
    res.json({ result: true });
  } else {
    res.json({ result: false });
  }
};

// 검색창 데이터베이스 가져오기
const porjectlist_search = async (req, res) => {
  const projects = await models.Project.findAll({
    where: {
      title: {
        [Op.like]: `%${req.query.value}%`,
      },
    },
  });
  let count = 1;
  let sendData = {};
  projects.forEach((project) => {
    sendData[project.project_id] = [
      project.thumnail,
      project.title,
      project.members,
    ];
    count += 1;
  });
  res.json({
    sendData,
  });
};

// 태그 검색
const tag_search = async (req, res) => {
  const projectTags = await models.ProjectTag.findAll({
    include: [
      {
        model: models.Project, // Project 모델과 inner join
        attributes: ["project_id", "title", "members"], // 필요한 Project 모델의 속성을 선택
      },
      {
        model: models.Tag, // Tag 모델과 inner join
        attributes: ["tag_id", "tag_name"], // 필요한 Tag 모델의 속성을 선택
      },
    ],
  });
  res.json({ result: projectTags });
};

const recoplearncheck = async (req, res) => {
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
  const recoplearnId = await models.Recoplearn.findOne({
    where: {
      project_id: req.body.data,
    },
  });
  const response = await models.UserRecoplearn.findAll({
    where: {
      user_id: decode.user_id,
      Recoplearn_id: recoplearnId.Recoplearn_id,
    },
  });

  //비었으면 false 있으면 true
  if (response.length != 0) {
    res.json({ result: true });
  } else {
    res.json({ result: false });
  }
};

//참가처리
const recoplearnjoin_post = async (req, res) => {
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

  let result;
  const nowrecoplearn = await models.Recoplearn.findOne({
    where: {
      project_id: req.body.data,
    },
  });
  const joinrecoplearn = {
    user_id: decode.user_id,
    Recoplearn_id: nowrecoplearn.Recoplearn_id,
  };

  if (nowrecoplearn.current_num == nowrecoplearn.goal_num) {
    result = "이 프로젝트는마감된 프로젝트입니다.";
  } else {
    if (req.body.role == "front") {
      if (nowrecoplearn.front_num == nowrecoplearn.front_goal_num) {
        result = "프론트엔드는 마감되었습니다.";
      } else {
        await models.Recoplearn.update(
          {
            front_num: nowrecoplearn.front_num + 1, // front_num 값을 1 증가시킴
            current_num: nowrecoplearn.current_num + 1, // current_num 값을 1 증가시킴
          },
          {
            where: {
              project_id: req.body.data,
            },
          }
        );
        result = true;
        await models.UserRecoplearn.create(joinrecoplearn);
        // console.log("해당 프로젝트 리코프런 사람들", member);
        if (nowrecoplearn.current_num == nowrecoplearn.goal_num - 1) {
          const member = await models.UserRecoplearn.findAll({
            where: {
              Recoplearn_id: nowrecoplearn.Recoplearn_id,
            },
          });
          const roomname = await models.Project.findOne({
            where: {
              project_id: nowrecoplearn.project_id,
            },
          });
          const roomnum = await models.Room.create({
            room_name: roomname.title,
          });
          for (let key in member) {
            await models.UserRoom.create({
              room_id: roomnum.room_id,
              user_id: member[key].user_id,
            });
          }
          ``;
        }
      }
    } else {
      if (nowrecoplearn.back_num == nowrecoplearn.back_goal_num) {
        result = "백엔드는 마감되었습니다.";
      } else {
        await models.Recoplearn.update(
          {
            back_num: nowrecoplearn.back_num + 1, // back_num 값을 1 증가시킴
            current_num: nowrecoplearn.current_num + 1, // current_num 값을 1 증가시킴
          },
          {
            where: {
              project_id: req.body.data, // Recoplearn ID 필터링 조건
            },
          }
        );
        result = true;
        await models.UserRecoplearn.create(joinrecoplearn);
        // console.log("해당 프로젝트 리코프런 사람들", member);
        if (nowrecoplearn.current_num == nowrecoplearn.goal_num - 1) {
          const member = await models.UserRecoplearn.findAll({
            where: {
              Recoplearn_id: nowrecoplearn.Recoplearn_id,
            },
          });
          const roomname = await models.Project.findOne({
            where: {
              project_id: nowrecoplearn.project_id,
            },
          });
          const roomnum = await models.Room.create({
            room_name: roomname.title,
          });
          for (let key in member) {
            await models.UserRoom.create({
              room_id: roomnum.room_id,
              user_id: member[key].user_id,
            });
          }
        }
      }
    }
  }
  res.json({ result });
};

module.exports = {
  projectlist,
  projectlist_post,
  recoplearnlist,
  recoplearnlist_post,
  project_upload,
  project,
  makerrecoplearn_post,
  makerecoplearn,
  updatebtn,
  porjectlist_search,
  tag_search,
  recoplearncheck,
  recoplearnjoin_post,
  logout,
};
