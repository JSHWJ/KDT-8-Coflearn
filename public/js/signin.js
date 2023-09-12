function login(e) {
  e.preventDefault();

  axios({
    method: "POST",
    url: "/header_login",

    data: {
      email: document.querySelector("#login_email").value,
      pw: document.querySelector("#pw").value,
    },
  }).then((res) => {
    console.log(res.data);
  });
}
