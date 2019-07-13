var express = require('express');
var http = require('http');
var path = require('path');
var static = require('serve-static');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// MySql
var mysql = require('mysql');
var con = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "123456",
  database : "booking_student_cafeteria",
  insecureAuth : true
});

// con.connect(function(err){
//   if (err) throw err;
//   console.log("Connected!");
// });

app.use(static(path.join(__dirname,'/')));
app.use(express.json());

app.set('port', process.env.PORT || 8080);

app.get('/', function(req,res){
  res.redirect('main_login.html');
});

//Food MenuDetail
app.post('/FoodMenu/data_load', (req,res) => {
  var cafeteria = req.body.cafeteria;

  var menu_data_sql = "select name,price,image FROM menu where cafeteria='"+ cafeteria + "'";
  con.query(menu_data_sql,function(err,result){
    if(err){
      throw err;
    }
    res.send(result);
  })
});

//Menu Detail
app.post('/MenuDetail/menu_data_load', (req,res) => {
  var cafeteria = req.body.cafeteria;
  var menu = req.body.menu;

  var menu_data_sql = "select image,content,price FROM menu where cafeteria='"+ cafeteria +"' and name='"+ menu +"'";
  console.log(menu_data_sql);
  con.query(menu_data_sql,function(err,result){
    if(err){
      throw err;
    }
    res.send(result);
  })
});

app.post('/MenuDetail/reply_data_load', (req,res) => {

  var cafeteria = req.body.cafeteria;
  var menu = req.body.menu;
  var reply_data_sql = "select nickname,content,star FROM reply where cafeteria='"+ cafeteria +"' and menu='"+ menu +"'";
  console.log(reply_data_sql);
  con.query(reply_data_sql,function(err,result){
    if(err){
      throw err;
    }
    res.send(result);
  })
});

app.post('/MenuDetail/write_reply', (req,res) => {
  var nickname = req.body.nickname;
  var content = req.body.review;
  var star = req.body.star;
  var write_reply_sql = "INSERT INTO reply (id,cafeteria,menu,nickname,content,star) VALUES (NULL,'"+cafeteria+"','"+menu
  +"','"+nickname+"','"+content+"','"+star+"')";
  con.query(write_reply_sql,function(err,result){
    if(err){
      throw err;
    }
    res.send(result);
  })
});

app.post('/MenuDetail/reserve', (req,res) => {
  var cafeteria = req.body.cafeteria;
  var menu = req.body.menu;
  var time = req.body.time;
  var user_id = req.body.user_id;
  var complete = req.body.complete;
  var image_src = req.body.image_src;
  var price = req.body.menu_price;

  var sql = "INSERT INTO reserve (id,cafeteria,menu,time,complete,user_id,image_src,price) VALUES (NULL,'"+cafeteria+"','"+menu
  +"','"+time+"','"+complete+"','"+user_id+"','"+image_src+"','"+price+"')";
  console.log(sql);
  con.query(sql, function(err, result){
    if (err){
      throw err;
    }
    res.send('예약 완료');
  })
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Server Start...' + app.get('port'));
});
