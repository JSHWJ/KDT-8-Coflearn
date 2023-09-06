const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;
app.set('view engine', 'ejs');
app.use('/views', express.static('./views'));
app.use('/static', express.static('./static'));
app.set(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render('main');
})

app.get('/mypage', (req, res) => {
    res.render('mypage');
})

app.listen(PORT, ()=>{
    console.log('local 연결 완료');
})