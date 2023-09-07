const { User } = require("../models");

// 메인 페이지
const main = (req, res) => {
  res.render("main");
};

// 상세 페이지
const detailPage = (req, res) => {
  res.render("detailPage");
};

module.exports = {
  main,
  detailPage,
};
