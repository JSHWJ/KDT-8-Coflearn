const express = require("express");
const router = express.Router();
const controller = require("../controller/Cdjmain");

//////////////////////////////////////////////////
// GET

router.get("/main", controller.main);

//마이페이지
router.get("/mypage/:id", controller.mypage);
router.get("/api/mypage/:id", controller.mypage_data);
router.get("/api/mypage/project/:id", controller.myproj_data);
router.get("/api/mypage/cart/:id", controller.likepro_data);
router.get("/api/mypage/recoplearn/:id", controller.recop_data);

//////////////////////////////////////////////////
// POST

// router.post("/main", controller.main_post);

// 로그인 마이페이지

module.exports = router;
