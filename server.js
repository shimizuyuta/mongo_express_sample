const express = require('express');
const app = express();
const User = require('./models/user');
const router = require('./router')
var path = require('path');
const v1 = '/api/v1'
var createError = require('http-errors')
require('dotenv').config({path:'./config/.env'});
const PORT = process.env.PORT
// const morgan = require(morgan)
const authMiddleware = require('./middleware/auth').authMiddleware
const passport = require('./passport')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// staticメソッドを利用し、指定ディレクトリ以下の静的ファイルを読み込む
app.use("/public", express.static(__dirname + "/public"));

// テンプレートエンジンの指定
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

//db_connection
const initConnectionPool = require('./db/dbconnection');
initConnectionPool().then((data)=>{
    console.log('mongo_data_connect_______________');
})


// if(process.env.NODE_ENV==="dvelopment"){
//     app.use(morgan('dev'))
// }

//routing
app.use(v1,router)
app.get("/", (req, res) => {
    // index.ejsをレンダリング
    res.render("index");
});
app.get("/user", (req, res) => {
    // index.ejsをレンダリング
    res.render("index");
});
app.get("/login", (req, res) => {
    // index.ejsをレンダリング
    res.render("login");
});
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/user');
  });

app.post('/login', 
passport.authenticate('local', { failureRedirect: '/' }),
function(req, res) {
  res.redirect('/user')
});



//error処理
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    console.log(err,'err____________________')
    res.sendStatus(err.status || 500)
    // res.render('/error',{data:JSON.stringify(err)})
  });
  

  //port:3000

  app.listen(PORT,()=>{
      console.log('running server')
  })

  module.exports = app;