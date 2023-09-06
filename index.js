const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken"); // 토큰 생성 및 검증 라이브러리
const cookieParser = require("cookie-parser");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

// MySQL 연결 설정
const db = mysql.createConnection({
  host: "localhost",
  user: "db_user",
  password: "db_password",
  database: "db_name",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
    return;
  }
  console.log("MySQL 연결 성공");
});

app.use(cookieParser());

// 토큰 검증
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
}

io.on("connection", (socket) => {
  console.log("사용자가 연결되었습니다.");

  socket.on("join room", (token, room_id) => {
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      // 토큰 검증 실패
      console.log("토큰 검증 실패");
      return;
    }

    // 사용자가 룸의 참여 권한이 있는지 검사
    const query = "SELECT * FROM UserRoom WHERE user_id = ? AND room_id = ?";
    db.query(query, [decodedToken.username, room_id], (err, results) => {
      if (err) {
        console.error("데이터베이스 쿼리 실패:", err);
        return;
      }

      if (results.length === 0) {
        // 사용자에게 룸 참여 권한이 없는 경우
        console.log(
          `${decodedToken.nick_name}은(는) ${room_id} 채팅방에 참여할 권한이 없습니다.`
        );
        return;
      }

      // 사용자에게 룸 참여 권한이 있는 경우
      socket.join(room_id);
      io.to(room_id).emit(
        "chat message",
        `${decodedToken.nick_name} 님이 입장하셨습니다.`
      );
    });

    // 이후 채팅 메시지를 처리하는 로직을 추가할 수 있습니다.
  });

  socket.on("get user list", (room_id) => {
    // 채팅방에서 사용자 목록을 가져오기
    const query = "SELECT nick_name FROM UserRoom WHERE room_id = ?";
    db.query(query, [room_id], (err, results) => {
      if (err) {
        console.error("데이터베이스 쿼리 실패:", err);
        return;
      }

      const userList = results.map((row) => row.nick_name);
      socket.emit("user list", userList);
    });
  });

  socket.on("disconnect", () => {
    console.log("사용자가 연결을 해제했습니다.");
  });
});

server.listen(3000, () => {
  console.log("서버가 3000 포트에서 실행 중입니다.");
});
