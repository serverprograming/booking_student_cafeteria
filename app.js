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
  insecureAuth : true
});

con.connect(function(err){
  if (err) throw err;
  console.log("Connected!");
});

app.use(static(path.join(__dirname,'/')));
app.use(express.json());

app.set('port', process.env.PORT || 8080);

app.get('/', function(res,req){
  res.redirect('main.html');
});


//Menu Detai
app.post('/MenuDetail/reserve', (req,res) => {
  console.log(req.body);
})



http.createServer(app).listen(app.get('port'), function(){
  console.log('Server Start...' + app.get('port'));
});
