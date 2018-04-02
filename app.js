var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let mysql = require('mysql');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

//database

let db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  port:3306,
  database:'funchu'//打开库
});
db.connect();
app.use('/index',(req,res)=>{
  var Sql="SELECT * FROM foods";
  db.query(Sql,(err,data)=>{
    res.send(data);
  })
// db.connect();
  
 
  // db.end();
})
app.use('/index1',(req,res)=>{
  var hotelSql="SELECT * FROM hotel";
  db.query(hotelSql,(err,data)=>{
    res.send(data);
    // console.log(data);
  })
  // db.end();
})
app.use('/index2',(req,res)=>{
  var hotelSql="SELECT * FROM road";
  db.query(hotelSql,(err,data)=>{
    res.send(data);
    console.log(data);
  })
  // db.end();
})
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(express.static('./public'));

module.exports = app;
