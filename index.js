const express = require("express");
const app = express();
var path = require("path");
const PORT = 8000;

app.set("view engine", "ejs");
app.set(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//라우터 분리
const router = require("./routes/main");
app.use("/", router);

//오류처리
app.use("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log("http://localhost:8000");
});
