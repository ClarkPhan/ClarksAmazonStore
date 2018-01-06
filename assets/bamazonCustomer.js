// Import mysql
var mysql = require('mysql');

// Import colors
var color = require('colors');

// Read and set environment variables
var dotenv = require("dotenv").config();

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.pw,
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
});

function queryData() {
  connection.query("SELECT * FROM products", function (err,res) {
    print(res);
  })
}

function print(res) {
  for (var i = 0; i < res.length; i++) {
    for (var i = 0; i < res.length; i++) {
      console.log('-------------------------------------');
      console.log('Item: ' + res[i].item_id);
      console.log('Stock: ' + res[i].stock_quantity.toString().magenta);
      console.log('Price: ' + res[i].price.toString().green);
      console.log('Product: ' + res[i].product_name.red);
      console.log('Department: ' + res[i].department_name.cyan);
      console.log('-------------------------------------');
    }
  }
}

function selectProduct(id) {
  connection.query("SELECT * FROM products WHERE item_id =?", [id], function(err,res) {
    print(res);
  })
}

module.exports = {
  queryData: queryData,
  selectProduct: selectProduct
} 