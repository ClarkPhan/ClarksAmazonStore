// Import mysql
var mysql = require('mysql');
var color = require('colors');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'manohman',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected');
  console.log('-------------------------------------');
  queryData();
});

function queryData() {
  connection.query("SELECT * FROM products", function (err,res) {
    for (var i = 0; i < res.length; i++) {
      console.log('Item: ' + res[i].item_id);
      console.log('Stock: ' + res[i].stock_quantity.toString().magenta);
      console.log('Price: ' + res[i].price.toString().green);
      console.log('Product: ' + res[i].product_name.red);
      console.log('Department: ' + res[i].department_name.cyan);
      console.log('-------------------------------------');
    }
  })
}