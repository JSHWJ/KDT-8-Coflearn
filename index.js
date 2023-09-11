require("dotenv").config();
const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_REGION, S3_BUCKET } =
  process.env;

// 모듈require
const express = require("express");
const app = express();
var path = require("path");
const db = require("./models");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const nodemailer = require("nodemailer");
PORT = 8000;

app.set("view engine", "ejs");
app.set(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// aws설정
aws.config.update({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  region: S3_REGION,
});

// S3설정
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname,
      });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

//router 분리
const router = require("./routes/main");
app.use("/", router);

//s3 이미지 처리
app.post("/api/project/img/write", upload.single("data"), (req, res) => {
  res.json({ imageUrl: req.file.location });
});

//s3 비디오처리
app.post("/api/project/video/upload", upload.single("file"), (req, res) => {
  res.json({ imageUrl: req.file.location });
});

//오류처리
app.use("*", (req, res) => {
  res.status(404).render("404");
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
