const express = require("express");
const router = express.Router();
const controller = require("../controller/C_ch_main");

//////////////////////////////////////////////////
// GET

//메인페이지
router.get("/", controller.main);

//마이페이지
router.get("/mypage", controller.mypage);

// 회원가입
router.get("/signup", controller.signup);

// 로그인 모달
router.get("/login_modal", controller.login_modal);

//프로젝트 목록페이지
router.get("/project-list", controller.projectlist);

//리코프런 목록페이지
router.get("/recoplearn-list", controller.recoplearnlist);

//프로젝트업로드 페이지
router.get("/project", controller.project);

// 상세페이지
router.get("/detailPage", controller.detail);

router.get("/detailPage/review", controller.detailGet_review);

router.get("/detailPage/community/write", controller.detailGet_community);
//////////////////////////////////////////////////
// POST
router.post("/detailPage/review", controller.detailPost_review);

router.post("/detailPage/community/write", controller.detailPost_community);

//프로젝트 목록 페이지 데이터 가져오기
router.post("/api/project-list", controller.projectlist_post);

//리코프런 목록 페이지 데이터 가져오기
router.post("/api/recoplearn-list", controller.recoplearnlist_post);

//프로젝트 업로드
router.post("/api/project/write", controller.project_upload);

// 로그인 마이페이지

module.exports = router;
