var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cjfwls1226',
    database: 'opentutorials'
});

connection.connect();

connection.query('SELECT * from topic', function (error, results, fields) {
    if (error)
    {
        console.log(err)
    };
    console.log(results);
});

connection.end();