const db = require("../models");
const models = db.User;
const { SECRET_KEY } = process.env;

const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// 채팅방 들어가는 임의 페이지
const ex = (req, res) => {
  res.render("index");
};

const chat = async (req, res) => {
  const roomId = req.params.roomId;

  try {
    const room = await models.Room.findByPk(roomId);

    if (!room) {
      console.log(`room_id ${roomId}에 해당하는 레코드가 없습니다.`);
      res.status(404).json({ error: "채팅방을 찾을 수 없습니다." });
      return;
    }

    const roomName = room.get("room_name");

    const token = req.cookies.jwt;

    try {
      const decodedToken = jwt.verify(token, SECRET_KEY);

      const userId = decodedToken.user_id; // 토큰에서 유저 아이디 추출
      const userNickname = decodedToken.nick_name; // 토큰에서 닉네임 추출

      const userRoom = await models.UserRoom.findOne({
        where: { user_id: userId, room_id: roomId },
      });

      if (!userRoom) {
        console.log(
          `${userNickname}은(는) ${roomId} 채팅방에 참여할 권한이 없습니다.`
        );
        res.status(403).json({ error: "채팅방에 참여할 권한이 없습니다." });
        return;
      }
      res.render("chat");
    } catch (err) {
      console.log("토큰 검증 실패");
      res.status(401).json({ error: "토큰 검증 실패" });
      return;
    }
  } catch (error) {
    console.error("채팅방 정보 검색 실패:", error);
    res.status(500).json({ error: "채팅방 정보 검색 실패" });
  }
};

const room_info = async (req, res) => {
  const roomId = req.params.roomId;

  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, SECRET_KEY);
  const nick_name = decodedToken.nick_name; // 토큰에서 닉네임 추출

  try {
    const userList = await models.UserRoom.findAll({
      include: {
        model: models.User, // User 테이블과 조인
        attributes: ["nick_name"], // 필요한 열만 선택
      },
      where: { room_id: roomId },
    });

    const room = await models.Room.findByPk(roomId);

    if (!room) {
      console.log(`room_id ${roomId}에 해당하는 레코드가 없습니다.`);
      return res.status(404).json({ error: "채팅방을 찾을 수 없습니다." });
    }

    const roomName = room.get("room_name");

    // userList에서 nick_name만 추출하여 배열로 변환
    const nickNames = userList.map((userRoom) => userRoom.User.nick_name);
    console.log("백엔드에서 닉네임:", nickNames);
    // JSON 형식으로 응답
    const responseData = { roomId, roomName, userList: nickNames, nick_name };
    res.json(responseData);
  } catch (error) {
    console.error("채팅방 정보 검색 실패:", error);
    res.status(500).json({ error: "채팅방 정보 검색 실패" });
  }
};

module.exports = {
  ex,
  chat,
  room_info,
};
