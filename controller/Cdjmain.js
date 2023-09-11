// const { User } = require("../models");
const db = require('../models');
const models = db.User;

let proj, recop, revw, proj_all;

const main_set = async () => {
  proj = await models.Project.findAll({
    order:[['project_id','DESC']],
    limit: 8
  });

  recop = await models.Recoplearn.findAll({
    order:[['Recoplearn_id','DESC']],
    limit: 8
  });
  
  proj_all = await models.Project.findAll({}); 

  revw = await models.Review.findAll({});

}


//메인페이지 랜더
const main = (req, res) => {  
  res.render('main');
}  

//메인 페이지 데이터 전송
const main_post = async (req, res) => {
  await main_set();

  // 각 테이블의 데이터를 await으로 받아온 후 변수에 넣기
  const projectData = await proj;
  const copData = await recop;
  const revwData = await revw;
  const projDataAll = await proj_all;

  //불러와졌는지 체크
  // console.log('프로젝트', projectData);
  console.log('리코프런', copData);
  // console.log('리뷰', revwData);

  //각 데이터를 사용하기 쉽도록 객체로 만들 배열 만들기
  const proJson = {};
  const proJsonall = {};
  const recopJson ={};
  const revwJson = {};

    // 프로젝트 데이터 객체 만들기
  for( let i = 0; i < projectData.length; i++) {
    proJson[i] = 
    { 
      project_id: projectData[i].project_id,
     ptitle: projectData[i].title,
     pcontent: projectData[i].content,
     pvideo: projectData[i].video,
     pPeriod: projectData[i].pariod,
     pmembers: projectData[i].members,
     plink: projectData[i].link,
     }
  }


  for( let i = 0; i < projDataAll.length; i++) {
    proJsonall[i] = 
    { 
      project_id: projDataAll[i].project_id,
     ptitle: projDataAll[i].title,
     pcontent: projDataAll[i].content,
     pvideo: projDataAll[i].video,
     pPeriod: projDataAll[i].pariod,
     pmembers: projDataAll[i].members,
     plink: projDataAll[i].link,
     }
  }

     // 리코프런 데이터 객체 만들기
  for( let i = 0; i < copData.length; i++) {
    recopJson[i] = 
    { 

      recop_id: copData[i].Recoplearn_id,
      project_id: copData[i].project_id,
      front_num: copData[i].font_num,
      back_num: copData[i].back_num,
      front_goal_num: copData[i].font_goal_num,
      back_goal_num: copData[i].back_goal_num,
      crr_num: copData[i].current_num,
      goal_num: copData[i].goal_num,

     }
 }
  

  // 후기 데이터 객체 만들기
  for( let i = 0; i < revwData.length; i++) {
    revwJson[i] = 
     { 
      revw_id: revwData[i].review_id,
      r_userid: revwData[i].user_id,
      r_proid: revwData[i].project_id,
      revw_con: revwData[i].review_content,
      }
  }

  // console.log("check 프로",proJson);
  // console.log("check 리코",recopJson);
  // console.log("check 후기",revwJson);
  console.log('모든 프로젝트', proJsonall)


  res.json({ project : proJson, projAll : proJsonall, recop : recopJson, revw : revwJson});
};

//마이페이지
const mypage = (req, res) => {
  res.render("mypage");
};

module.exports = {
  main,
  main_post,
  mypage,
};
