const { User } = require("../models");

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
};

module.exports = {
  main,
  signup,
  login_test,
  login_modal,
};
