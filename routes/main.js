const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

router.get("/", controller.main);
router.get("/project-list", controller.projectlist);
router.get("/recoplearn-list", controller.recoplearnlist);
router.get("/project", controller.project);
router.get("/detailpage", controller.detail);
module.exports = router;
