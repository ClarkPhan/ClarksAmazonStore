// Import mysql
var mysql = require('mysql');
var color = require('colors');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected');
});