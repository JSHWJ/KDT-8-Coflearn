const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

//메이페이지-get
router.get("/", controller.main);
//프로젝트 목록페이지-get
router.get("/project-list", controller.projectlist);
//리코프런 목록페이지-get
router.get("/recoplearn-list", controller.recoplearnlist);
//프로젝트업로드 페이지-get
router.get("/project", controller.project);
//상세페이지-get
router.get("/detailpage", controller.detail);

module.exports = router;
