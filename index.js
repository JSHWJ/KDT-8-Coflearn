const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");

const path = require("path");
const db = require("./models");
const PORT = 8000;

require("dotenv").config();

// 정적 파일을 제공할 디렉토리를 설정

const secretKey = process.env.SECRET_KEY;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//body-parser
app.use(express.json());
//view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views", "css")));
app.use(express.static(path.join(__dirname, "routes")));
app.use(cookieParser());

//router
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/user/nickname", (req, res) => {
  try {
    const token = req.cookies.token; // 클라이언트 쿠키에서 토큰을 가져옵니다.
    if (!token) {
      throw new Error("토큰이 없습니다.");
    }

    const decodedToken = verifyToken(token); // 토큰을 검증합니다.
    if (!decodedToken) {
      throw new Error("토큰 검증 실패");
    }

    const userNickname = decodedToken.username;

    res.json({ userNickname });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.get("/api/chat/:roomId", async (req, res) => {
  const roomId = req.params.roomId;

  try {
    const userList = await db.User.UserRoom.findAll({
      include: db.User.User,
      where: { room_id: roomId },
    });

    const room = await db.User.Room.findByPk(roomId);

    if (!room) {
      console.log(`room_id ${roomId}에 해당하는 레코드가 없습니다.`);
      return res.status(404).json({ error: "채팅방을 찾을 수 없습니다." });
    }

    const roomName = room.get("room_name");

    // JSON 형식으로 응답
    const responseData = { roomId, roomName, userList };
    res.json(responseData);
  } catch (error) {
    console.error("채팅방 정보 검색 실패:", error);
    res.status(500).json({ error: "채팅방 정보 검색 실패" });
  }
});

// app.get("/chat/:roomId", async (req, res) => {
//   const roomId = req.params.roomId;

//   try {
//     const userList = await db.User.UserRoom.findAll({
//       include: db.User.User,
//       where: { room_id: roomId },
//     });

//     const room = await db.User.Room.findByPk(roomId);

//     if (!room) {
//       console.log(`room_id ${roomId}에 해당하는 레코드가 없습니다.`);
//       res.status(404).json({ error: "채팅방을 찾을 수 없습니다." });
//       return;
//     }

//     const roomName = room.get("room_name");

//     // JSON 형식으로 응답
//     res.json({ roomId, roomName, userList });
//   } catch (error) {
//     console.error("채팅방 정보 검색 실패:", error);
//     res.status(500).json({ error: "채팅방 정보 검색 실패" });
//   }
// });

// app.get("/chat/:roomId", async (req, res) => {
//   const roomId = req.params.roomId;

//   try {
//     const userList = await db.User.UserRoom.findAll({
//       include: db.User.User, // 이 부분에서 db.User는 연결된 모델이어야 합니다.
//       where: { room_id: roomId },
//     });

//     const room = await db.User.Room.findByPk(roomId);

//     if (!room) {
//       // 레코드가 없는 경우
//       console.log("123");
//       console.log(`room_id ${roomId}에 해당하는 레코드가 없습니다.`);
//     } else {
//       // 레코드가 있는 경우
//       console.log("12323423423423");
//       console.log(`room_id ${roomId}에 해당하는 레코드가 ㅇㅆ습니다.`);
//       const roomName = room.get("room_name");
//       console.log(roomName);
//     }

//     const roomName = room.dataValues.room_name;

//     res.render("chat", { roomId, roomName, userList });
//   } catch (error) {
//     console.error("채팅방 정보 검색 실패:", error);
//     res.status(500).json({ error: "채팅방 정보 검색 실패" });
//   }
// });

// ...

app.get("/chat/:roomId", async (req, res) => {
  const roomId = req.params.roomId;

  try {
    const room = await db.User.Room.findByPk(roomId);

    if (!room) {
      console.log(`room_id ${roomId}에 해당하는 레코드가 없습니다.`);
      res.status(404).json({ error: "채팅방을 찾을 수 없습니다." });
      return;
    }

    const roomName = room.get("room_name");

    // EJS 템플릿을 렌더링하고 클라이언트로 전송
    res.render("chat", { roomId, roomName });
  } catch (error) {
    console.error("채팅방 정보 검색 실패:", error);
    res.status(500).json({ error: "채팅방 정보 검색 실패" });
  }
});

app.get("/add", async (req, res) => {
  try {
    // 두 명의 사용자를 디비에 추가합니다.
    const user1 = await db.User.User.create({
      nick_name: "User 1",
      email: "user1@example.com",
      pw: "password1", // 실제 환경에서는 해싱된 비밀번호를 사용해야 합니다.
    });

    const user2 = await db.User.User.create({
      nick_name: "User 2",
      email: "user2@example.com",
      pw: "password2", // 실제 환경에서는 해싱된 비밀번호를 사용해야 합니다.
    });

    // 사용자 정보를 기반으로 토큰을 발급합니다.
    const token1 = jwt.sign(
      { username: user1.user_id, nick_name: user1.nick_name },
      secretKey,
      { expiresIn: "1h" }
    );
    const token2 = jwt.sign(
      { username: user2.user_id, nick_name: user2.nick_name },
      secretKey,
      { expiresIn: "1h" }
    );

    // 디비에 사용자를 추가한 후에 토큰을 발급받았으므로, 이 토큰을 클라이언트에게 전송하거나 사용할 수 있습니다.

    // 클라이언트에게 토큰을 쿠키로 설정합니다.
    res.cookie("token1", token1, { httpOnly: true });
    res.cookie("token2", token2, { httpOnly: true });

    res.json({ message: "테스트 사용자 추가 및 토큰 발급 완료" });
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ error: error.message });
  }
});
// ...

// 토큰 검증
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
}

///////////////////////////////////채팅방

io.on("connection", (socket) => {
  console.log("사용자가 연결되었습니다.");

  socket.on("join room", async (room_id) => {
    const token = socket.handshake.headers.cookie;
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      console.log("토큰 검증 실패");
      return;
    }

    try {
      const userRoom = await db.User.UserRoom.findOne({
        where: { user_id: decodedToken.username, room_id: room_id },
      });

      if (!userRoom) {
        console.log(
          `${decodedToken.username}은(는) ${room_id} 채팅방에 참여할 권한이 없습니다.`
        );
        return;
      }

      const previousMessages = await db.Messages.findAll({
        where: { room_id: room_id },
        order: [["send_at", "DESC"]],
      });

      // 이전 메시지를 클라이언트로 전송
      socket.emit("previous messages", previousMessages.reverse());

      socket.join(room_id);

      io.to(room_id).emit(
        "chat message",
        `${decodedToken.username} 님이 입장하셨습니다.`
      );
    } catch (error) {
      console.error("채팅방 입장 실패:", error);
    }
  });

  socket.on("sendMessage", async (room_id, message) => {
    const token = socket.handshake.headers.cookie;
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      console.log("토큰 검증 실패");
      return;
    }

    try {
      const userRoom = await db.User.UserRoom.findOne({
        where: { user_id: decodedToken.username, room_id: room_id },
      });

      if (!userRoom) {
        console.log(
          `${decodedToken.username}은(는) ${room_id} 채팅방에 메시지를 보낼 수 없습니다.`
        );
        return;
      }

      const newMessage = await db.User.Messages.create({
        user_id: decodedToken.username,
        room_id: room_id,
        nick_name: decodedToken.nick_name,
        content: message,
      });

      io.to(room_id).emit("chat message", {
        user_id: decodedToken.username,
        nick_name: decodedToken.nick_name,
        content: message,
        send_at: newMessage.send_at,
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
  server.listen(8000, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
