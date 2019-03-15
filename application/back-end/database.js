const mysql = require('mysql');

var connection = mysql.createConnection({
  	host     : 'localhost',
  	user     : 'root',
  	password : 'helpme',
  	database : 'test_database'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;