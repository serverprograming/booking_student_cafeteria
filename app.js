var express = require('express');
var http = require('http');
var path = require('path');
var static = require('serve-static');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(session({
  secret: 'cjfwls1226',
  resave: false,
  saveUninitialized: true
}));

// MySql
var mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cjfwls1226',
  database: "booking_student_cafeteria",
  insecureAuth: true
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(static(path.join(__dirname, '/')));
app.use(express.json());

app.set('port', process.env.PORT || 8080);

app.get('/', function (req, res) {
  res.redirect('main_login.html');
});

//Food MenuDetail
app.post('/FoodMenu/data_load', (req, res) => {
  var cafeteria = req.body.cafeteria;

  var menu_data_sql = "select name,price,image FROM menu where cafeteria='" + cafeteria + "'";
  con.query(menu_data_sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  })
});

//Menu Detail
app.post('/MenuDetail/menu_data_load', (req, res) => {
  var cafeteria = '학생 회관';
  var menu = '소금 구이 덮밥';
  var menu_data_sql = "select image,content FROM menu where cafeteria='" + cafeteria + "' and name='" + menu + "'";
  con.query(menu_data_sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  })
});

app.post('/MenuDetail/reply_data_load', (req, res) => {
  var cafeteria = req.body.cafeteria;
  var menu = req.body.menu;
  var reply_data_sql = "select nickname,content,star FROM reply where cafeteria='" + cafeteria + "' and menu='" + menu + "'";
  con.query(reply_data_sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  })
});

app.post('/MenuDetail/write_reply', (req, res) => {
  var nickname = req.body.nickname;
  var content = req.body.review;
  var star = req.body.star;
  var write_reply_sql = "INSERT INTO reply (id,cafeteria,menu,nickname,content,star) VALUES (NULL,'" + cafeteria + "','" + menu
    + "','" + nickname + "','" + content + "','" + star + "')";
  con.query(write_reply_sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  })
});

app.post('/MenuDetail/reserve', (req, res) => {
  var cafeteria = req.body.cafeteria;
  var menu = req.body.menu;
  var time = req.body.time;
  var user_id = req.body.user_id;
  var complete = req.body.complete;

  console.log(cafeteria, menu, time, user_id, complete);

  var sql = "INSERT INTO reserve (id,cafeteria,menu,time,complete,user_id) VALUES (NULL,'" + cafeteria + "','" + menu
    + "','" + time + "','" + complete + "','" + user_id + "')";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    console.log("1 record inserted");
  })
});

// login and register
app.post('/signup', (req, res) => {
  var id = req.body.id;
  var password = req.body.password;
  var nickname = req.body.nickname;
  var phone = req.body.phone;
  var manager1 = req.body.notmanager;
  var manager2 = req.body.manager;

  if (manager1 == '0') {
    var sql = "insert into member (id,nickname,phone,password,manager) values ('" + id + "', '" + nickname + "', '" + phone + "', '" + password + "', '" + manager1 + "')";
  }
  else {
    var sql = "insert into member (id,nickname,phone,password,manager) values ('" + id + "', '" + nickname + "', '" + phone + "', '" + password + "', '" + manager2 + "')";
  }

  console.log(sql);
  console.log(id, password, nickname, phone, manager1, manager2);

  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      if (err.code = "ER_DUP_ENTRY") {
        res.send("<script>alert('아이디가 중복됩니다.'); document.location.href='/signup.html';</script>");
      }
    }
    else {
      console.log("1 record inserted");
      res.send('<script>document.location.href="/login.html";</script>');
    }
  });
});

app.post('/login', (req, res) => {
  var id = req.body.id;
  var password = req.body.password;

  var checksql = `select count(*) from member where id='${id}' and password='${password}'`;
  var check;

  con.query(checksql, function (err, result) {
    if (err) {
      throw err;
    }
    else {
      check = result[0]['count(*)'];

      if (check == 1) {
        if (!req.session.userid) {
          req.session.userid = id;
        }
        res.send('<script>document.location.href="/cafeteria_menu.html";</script>');
      }
      else {
        res.send('<script>alert("아이디와 비밀번호를 확인하세요."); document.location.href="/login.html";</script>');
      }
    }
  });
});

app.post('/sessionchecker', function (req, res) {
  if (!req.session.userid) {
    res.send(false);
  }
  else {
    res.send(true);
  }
});

app.get('/logout', function (req, res) {
  if (req.session.userid) {
    delete req.session.userid;
  }
  res.send("<script>document.location.href='/login.html';</script>");
});

app.post('/reservation', function (req, res) {
  // var id = req.body.id;
  // var cafeteria = req.body.cafeteria;
  // var menu = req.body.menu;
  // var time = req.body.time;
  // var complete = req.body.complete;
  // var user_id = req.body.user_id;
  // var price = req.body.price;
  // var image_src = req.body.image_src;

  var sql = "select * from reserve where user_id='" + req.session.userid + "'";

  con.query(sql, function (err, result, fields) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post('/cafeteria_menu', function (req, res) {
  var sql = "select manager from member where id='" + req.session.userid + "'";

  con.query(sql, function (err, result, fields) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post('/reservation_manager_hak', function(req, res) {
  var sql = "select * from reserve where cafeteria='학생회관'";

  con.query(sql, function(err, result, fields) {
    if(err) {
      throw err;
    }
    res.send(result);
  })
});

app.post('/reservation_manager_gun', function(req, res) {
  var sql = "select * from reserve where cafeteria='군자키친'";

  con.query(sql, function(err, result, fields) {
    if(err) {
      throw err;
    }
    res.send(result);
  })
});

app.post('/reservation_manager_jin', function(req, res) {
  var sql = "select * from reserve where cafeteria='진관키친'";

  con.query(sql, function(err, result, fields) {
    if(err) {
      throw err;
    }
    res.send(result);
  })
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Server Start...' + app.get('port'));
});

