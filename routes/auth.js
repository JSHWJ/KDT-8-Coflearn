function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}

export async function fetchUserToken() {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("토큰이 없습니다.");
    }
    return token;
  } catch (error) {
    console.error("오류 발생", error);
    return null;
  }
}

fetch("/user/nickname")
  .then((response) => response.json())
  .then((data) => {
    const userNickname = data.userNickname;
    console.log("사용자 닉네임:", userNickname);
  })
  .catch((error) => console.error("오류 발생:", error));
