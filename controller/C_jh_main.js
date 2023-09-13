const db = require("../models");
const models = db.User;

const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//////////////////////////////////////////////////
// GET

//상세페이지
const detail = (req, res) => {
  res.render("detailPage");
};

// 회원가입 페이지
const signup = (req, res) => {
  res.render("signup");
};

const login_test = (req, res) => {
  res.render("login_test");
};

const login_modal = (req, res) => {
  res.render("login_modal");
};

const header_login = (req, res) => {
  //   if (req.cookies) {
  //     res.render("header_login", { cookie: true, userName: req.body.nick_name });
  //   } else {
  //     res.render("header_login", { cookie: false });
  //   }
  //   res.send(req.cookies);

  if (req.cookies.isLoggedIn) {
    res.render("header_login", { cookie: true });
    console.log("쿠키값 전달 true");
  } else {
    res.render("header_login", { cookie: false });
    console.log("쿠키값 전달 false");
  }
};

//////////////////////////////////////////////////
// POST

// 회원가입 시 정보 저장
const post_signup = async (req, res) => {
  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.password;
  // const cert_code = req.body.cert_code;
  // // 인증번호 확인
  // if (cert_code !== "12345") {
  //   return res.send("인증번호가 올바르지 않습니다.");
  // }
  // // 회원가입 처리 로직
  // // DB에 저장하기
  // res.send("회원가입이 성공적으로 완료되었습니다");
  //
  const { nick_name, email, pw } = req.body;

  const hash = await bcryptPassword(pw);

  try {
    models.User.create({
      nick_name,
      email,
      pw: hash,
    }).then(() => {
      console.log("post_signup");
      console.log("res", res);
      console.log("res.data", res.data);

      res.json({ result: true });
    });
  } catch (error) {
    console.log(err);
  }
};

// 회원가입 시 이메일 요청
const post_email = async (req, res) => {
  const email = req.body.email;

  // 이메일 형식 확인
  if (!email || !!/^S+@\S.\S+$/.test(email)) {
    return res.status(400).send("유효한 이메일 주소를 입력하세요.");
  }

  // 난수 생성
  const cert_code = Math.floor(100000 + Math.random() * 900000).toString();

  // 인증번호 전송 로직
  try {
    await sendEmail(email, cert_code);
    res.status(200).send("전송 완료");
  } catch (error) {
    console.error("전송 오류", error);
    res.status(500).send("전송오류 발생");
  }
  //
  sendEmail(email, cert_code);
  res.send("인증번호가 이메일로 전송되었습니다");
};

// 로그인
const post_signin = async (req, res) => {
  const { email, pw } = req.body;

  // 아이디 ( 이메일 ) 찾기
  const user = await models.User.findOne({
    where: { email },
  });

  console.log("user 정보", user);

  if (user) {
    const result = await compareFunc(pw, user.pw);

    // 사용자 존재 O
    if (result) {
      res.cookie("isLoggedIn", true, cookieConfig);

      const token = jwt.sign(
        {
          user_id: user.user_id,
          email: user.email,
          nick_name: user.nick_name,
        },
        SECRET
      );

      res.json({ result: true, token, data: user });

      console.log("token", token);
      console.log("cookie 값 확인", req.cookies.isLoggedIn);
      console.log("로그인 성공");
    } else {
      // 비밀번호 틀릴 경우
      res.json({ result: false, message: "비밀번호가 일치하지 않습니다." });
    }
  } else {
    // 사용자 존재 X
    res.json({ result: false, message: "존재하지 않는 사용자입니다." });
  }
};

//////////////////////////////////////////////////
module.exports = {
  // GET

  detail,
  login_test,
  login_modal,
  header_login,
  signup,

  // POST
  post_email,
  post_signup,
  post_signin,
};

//////////////////////////////////////////////////
//  function

// 비밀번호 암호화 함수 bcrypt
const bcryptPassword = (password) => bcrypt.hash(password, 11);
const compareFunc = (password, dbpass) => bcrypt.compare(password, dbpass);

//쿠키 설정 함수
const cookieConfig = {
  httpOnly: true,
  maxAge: 60 * 1000 * 10, // 60 * 1000 = 1분
};

const SECRET = "mySecret";

// 이메일 전송 함수
const sendEmail = (email, cert_code) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_OAUTH_USER,
      password: process.env.GMAIL_OAUTH_USER_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Coplearn",
    to: email,
    subject: "[Copleran] 회원가입 인증 코드 입니다.",
    html: `<h1>CODE</h1><p>아래의 인증번호를 입력해 인증을 완료해 주세요.</p><h2>${cert_code}</h2>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("이메일 전송 오류:", error);
      res.status(500).send("이메일 전송 중 오류가 발생했습니다.");
    } else {
      console.log("이메일 전송 성공:", info.res);
      res.send("인증번호가 이메일로 전송되었습니다.");
    }
  });
};
