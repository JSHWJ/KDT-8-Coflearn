// const { google } = require("googleapis");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const CLIENT_ID = process.env.GMAIL_OAUTH_CLIENT_ID;
// const CLIENT_SECRET = process.env.GMAIL_OAUTH_CLIENT_SECRET;
// const REFRESH_TOKEN = process.env.GMAIL_OAUTH_REFRESH_TOKEN;

// const FROM_EMAIL = process.env.GMAIL_OAUTH_USER;
// const FROM_PASSWORD = process.env.GMAIL_OAUTH_USER_PASSWORD;

// // const oAuth2Client = new google.auth.Oauth2(CLIENT_ID, CLIENT_SECRET);

// // oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// // const sendEmail = () => {};

// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: FROM_EMAIL,
//     pass: FROM_PASSWORD,
//   },
// });

// let mailOptions = {
//   from: FROM_EMAIL,
//   // to : '받을 사람 값넣기',
//   subject: "[Copleran] 회원가입 인증 코드 입니다.",
//   text: `인증번호 : 어쩌구,,값넣기`,
//   html: "<h1>CODE</h1><p>어쩌구</p>",
// };
