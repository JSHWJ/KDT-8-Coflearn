const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

router.get("/", controller.main);

// 로그인 마이페이지

// 상세페이지

router.get("/detailPage", controller.detailPage);

module.exports = router;
