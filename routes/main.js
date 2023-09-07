const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

//////////////////////////////////////////////////
// GET

router.get("/", controller.main);

//마이페이지
router.get("/mypage", controller.mypage);

// 회원가입
router.get("/signup", controller.signup);

// 로그인
router.get("/login_test", controller.login_test);

// 로그인 모달
router.get("/login_modal", controller.login_modal);

//프로젝트 목록페이지
router.get("/project-list", controller.projectlist);

//리코프런 목록페이지
router.get("/recoplearn-list", controller.recoplearnlist);

//프로젝트업로드 페이지
router.get("/project", controller.project);

// 상세페이지
router.get("/detailPage", controller.detailPage);
//////////////////////////////////////////////////
// POST

// 로그인 마이페이지

module.exports = router;
