const express = require("express");
const app = express();
var path = require("path");
const db = require("./models");
const PORT = 8000;
const nodemailer = require("nodemailer");

app.set("view engine", "ejs");
app.set(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


//router 분리
const router = require("./routes/main");
app.use("/", router);

//오류처리
app.use("*", (req, res) => {
  res.status(404).render("404");
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
