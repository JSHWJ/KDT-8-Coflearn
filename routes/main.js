const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

//////////////////////////////////////////////////
// GET

router.get("/", controller.main);

// 회원가입
router.get("/signup", controller.signup);

// 로그인
router.get("/login_test", controller.login_test);

// 로그인 모달
router.get("/login_modal", controller.login_modal);

//////////////////////////////////////////////////
// POST

/////////////////////////////////////////////////
module.exports = router;
