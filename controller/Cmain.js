const { User } = require("../models");


// 메인 페이지
const main = (req, res) => {
  res.render("main");
};

const signup = (req, res) => {
  res.render("signup");
};

const login_test = (req, res) => {
  res.render("login_test");
};

const login_modal = (req, res) => {
  res.render("login_modal");

// 상세 페이지
const detailPage = (req, res) => {
  res.render("detailPage");
};

module.exports = {
  main,
  signup,
  login_test,
  login_modal,
  detailPage,
};
