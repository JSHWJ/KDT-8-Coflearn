const express = require("express");
const path = require("path");
const db = require("./models");
const app = express();
const PORT = 8000;
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.set(express.urlencoded({ extended: true }));
app.use(express.json());

//router 분리
const router = require("./routes/main");
app.use("/", router);

//오류처리
app.use("*", (req, res) => {
  res.status(404).render("404");
});

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
