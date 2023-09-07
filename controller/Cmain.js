const { User } = require("../models");

// 프로젝트리스트 페이지
const projectlist = (req, res) => {
  res.render("projectlist");
};
// 리코프런리스트 페이지
const recoplearnlist = (req, res) => {
  res.render("recoplearn");
};

//프로젝트 업로드 페이지
const project = (req, res) => {
  res.render("project");
};

//메인페이지
const main = (req, res) => {
  res.render("main");
};

//상세페이지
const detail = (req, res) => {
  res.render("detailPage");
};
module.exports = {
  projectlist,
  recoplearnlist,
  project,
  main,
  detail,
  
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
