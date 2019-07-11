var express = require('express');
var http = require('http');
var path = require('path');
var static = require('serve-static');

var app = express();

// MySql
var mysql = require('mysql');
var con = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "123456",
  insecureAuth : true
});

con.connect(function(err){
  if (err) throw err;
  console.log("Connected!");
});


app.use(static(path.join(__dirname,'/')));

app.set('port', process.env.PORT || 8080);
app.get('/', function(res,req){
  res.redirect('main.html');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server Start...' + app.get('port'));
});
