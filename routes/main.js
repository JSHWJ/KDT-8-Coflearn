const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

router.get("/", controller.main);
router.get("/project-list", controller.projectlist);
router.get("/recoplearn-list", controller.recoplearnlist);
router.get("/project", controller.project);

module.exports = router;
