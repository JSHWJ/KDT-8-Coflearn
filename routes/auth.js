import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}
// 쿠키에서 값을 가져와서 닉네임을 반환함
export async function fetchUserInfo() {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("토큰이 없습니다.");
    }
    const response = await axios.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    const userNickname = data.nick_name;
    return userNickname;
  } catch (error) {
    console.error("오류 발생", error);
    return null;
  }
}
