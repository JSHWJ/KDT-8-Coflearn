const express = require("express");
const router = express.Router();
const controller = require("../controller/Cdjmain");
const ch_controller = require("../controller/C_ch_main");
const hi_controller = require("../controller/C_hi_main");
const jh_controller = require("../controller/C_jh_main");

//////////////////////////////////////////////////
// GET

//메인 페이지
router.get("/main", controller.main);

//마이페이지
router.get("/mypage/:id", controller.mypage);
//마이페이지 나에 대한 정보 가져오기
router.get("/api/mypage/:id", controller.mypage_data);
//마이페이지 나의 프로젝트 가지고 오기
router.get("/api/mypage/project/:id", controller.myproj_data);
//마이페이지 내가 담은 프로젝트 가지고 오기
router.get("/api/mypage/cart/:id", controller.likepro_data);
//마이페이지 리코프런 가지고 오기
router.get("/api/mypage/recoplearn/:id", controller.recop_data);

// 회원가입
router.get("/signup", jh_controller.signup);

//로그아웃
router.get("/logout", ch_controller.logout);

// 로그인 모달
router.get("/login_modal", jh_controller.login_modal);
router.get("/header_login", jh_controller.header_login);

//프로젝트 목록페이지
router.get("/project-list", ch_controller.projectlist);

//프로젝트 목록 페이지에서 검색
router.get("/project-list/search", ch_controller.porjectlist_search);

//프로젝트 목록 페이지 태그 검색
router.get("/project-list/tag", ch_controller.tag_search);

//리코프런 목록페이지
router.get("/recoplearn-list", ch_controller.recoplearnlist);

//프로젝트업로드 페이지
router.get("/project", ch_controller.project);

// 상세페이지
router.get("/detailPage/:id", hi_controller.detail);

router.get("/detailPage/:id/tags", hi_controller.detailPage_tags);

// 상세페이지 프로젝트 소개
router.get("/detailPage/:id/intro", hi_controller.detailGet_intro);

// 상세페이지 후기
router.get("/detailPage/:id/review", hi_controller.detailGet_review);
// 상세페이지 커뮤니티detailGet_review
router.get(
  "/detailPage/:id/community/write",
  hi_controller.detailGet_community
);

router.get("/detailPage/:id/community/reply", hi_controller.detailGet_reply);

router.get("/detailPage/:id/recoplearn", hi_controller.detailGet_recoplearn);
//////////////////////////////////////////////////
// POST

//메인 페이지 정보 가져오기
router.post("/main", controller.main_post);

router.post("/detailPage/:id/review", hi_controller.detailPost_review);

router.post(
  "/detailPage/:id/community/write",
  hi_controller.detailPost_community
);

router.post("/detailPage/:id/community/reply", hi_controller.detailPost_reply);

router.get("/detailPage/:id/user", hi_controller.detailGet_user);

//상세페이지별 리코프런 버튼 수정하기
router.post("/api/detailpage/recoplearnBtn", ch_controller.updatebtn);

//프로젝트 리코프런 필수인원 정보 가져오기
router.post(
  "/api/detailPage/:id/recplearn/info",
  ch_controller.makerrecoplearn_post
);

//프로젝트 리코프런 등록하기
router.post("/api/detailpage/recoplearn/make", ch_controller.makerecoplearn);

//사용자가 지금 현재 페이지의 리코프런을 했는지 안했는지 확인하기
router.post("/api/detailpage/recoplearncheck", ch_controller.recoplearncheck);

//프로젝트 목록 페이지 데이터 가져오기
router.post("/api/project-list", ch_controller.projectlist_post);

//리코프런 목록 페이지 데이터 가져오기
router.post("/api/recoplearn-list", ch_controller.recoplearnlist_post);

//리코프런 참가하기
router.post(
  "/api/detailpage/recoplearn/join",
  ch_controller.recoplearnjoin_post
);

//프로젝트 업로드
router.post("/api/project/write", ch_controller.project_upload);

// 회원가입 정보 저장
router.post("/signup", jh_controller.post_signup);

// 이메일 전송
router.post("/signup", jh_controller.post_email);

// 로그인 정보
router.post("/header_login", jh_controller.post_signin);

// router.post("/main", controller.main_post);

// 로그인 마이페이지

module.exports = router;
