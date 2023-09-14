const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const http = require("http"); // http 모듈 추가
const socketIo = require("socket.io");
const path = require("path");
const db = require("./models");
const multer = require("multer"); // multer 모듈 추가
const aws = require("aws-sdk"); // aws-sdk 모듈 추가
const multerS3 = require("multer-s3");
const nodemailer = require("nodemailer");

require("dotenv").config();

const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_REGION, S3_BUCKET, SECRET } =
  process.env;

const PORT = 8000;

const app = express();
const server = http.createServer(app); // http 서버 생성
const io = socketIo(server);

// 정적 파일을 제공할 디렉토리를 설정
app.use(express.static(path.join(__dirname, "public")));

// body-parser
app.use(express.json());

// view engine
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

aws.config.update({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  region: S3_REGION,
});

// AWS S3 설정
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

// Router 분리
const router = require("./routes/main");
app.use("/", router);

// s3 이미지 처리
app.post("/api/project/img/write", upload.single("data"), (req, res) => {
  res.json({ imageUrl: req.file.location });
});

// s3 비디오 처리
app.post("/api/project/video/upload", upload.single("file"), (req, res) => {
  res.json({ imageUrl: req.file.location });
});

// 오류 처리
app.use("*", (req, res) => {
  res.status(404).render("404");
});

// 채팅방 기능
io.on("connection", (socket) => {
  console.log("사용자가 연결되었습니다.");

  socket.on("load previous messages", async (roomId) => {
    console.log(
      `클라이언트가 채팅방 ${roomId}에 이전 메시지 로드 요청을 보냈습니다.`
    );
    try {
      const previousMessages = await db.User.Messages.findAll({
        where: { room_id: roomId },
        order: [["send_at", "DESC"]],
      });
      if (previousMessages && previousMessages.length > 0) {
        socket.emit("previous messages", previousMessages.reverse());
      }
    } catch (error) {
      console.error("이전 메시지 조회 오류:", error);
    }
  });

  socket.on("join room", (roomId) => {
    console.log(`클라이언트가 채팅방 ${roomId}에 조인 요청을 보냈습니다.`);
    socket.join(roomId);
  });

  // io.to(room_id).emit(
  //   "chat message",
  //   `${decodedToken.username} 님이 입장하셨습니다.`
  // );
  socket.on("sendMessage", async (room_id, token, message, send_at) => {
    try {
      const decodedToken = jwt.verify(token, SECRET); // 토큰 검증

      const newMessage = await db.User.Messages.create({
        user_id: decodedToken.user_id,
        room_id: room_id,
        nick_name: decodedToken.nick_name,
        content: message,
        send_at: send_at, // 클라이언트에서 전달받은 send_at를 저장
      });

      io.to(room_id).emit("chat message", {
        user_id: decodedToken.username,
        nick_name: decodedToken.nick_name,
        content: message,
        send_at: newMessage.send_at, // 저장된 send_at를 사용
      });
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("사용자가 연결을 해제했습니다.");
  });
});

db.sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
