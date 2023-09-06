const express = require('express');
const session = require("express-session");
const app = express();
const PORT = 8000;
app.set('view engine', 'ejs');
app.use('/views', express.static('./views'));
app.use('/static', express.static('./static'));
app.set(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(PORT, ()=>{
    console.log('local 연결 완료');
})