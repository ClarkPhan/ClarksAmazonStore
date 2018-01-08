// Import mysql
var mysql = require('mysql');

// Import colors
var color = require('colors');

// Read and set environment variables
var dotenv = require("dotenv").config();

// Create connection to database
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.pw,
  database: 'bamazon'
});

// Connect to database
connection.connect(function(err) {
  if (err) throw err;
});

function queryData() {
  connection.query("SELECT * FROM products", function (err,res) {
    print(res);
  })
}

// Print out product info
function print(res) {
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

// Print out specific product
function getStockQuantity(id) {
  connection.query("SELECT * FROM products WHERE item_id =?", [id], function(err, res) {
    // Get stock quantity
    var stock_quantity = res[0].stock_quantity;
    if (stock_quantity > 0) {
      return res[0].stock_quantity;
    } else {
      console.log("Product out of stock!".red);
    }
  })
}

// Print out specific product info
function getItemInfo(id) {
  connection.query("SELECT * FROM products WHERE item_id =?", [id], function(err, res) {
    // Get stock quantity
    print(res);
  })
}


// Updates current product stock by
function updateCurrentProduct(item, amount) {
  var stock_quantity = getStockQuantity(item);
  if (amount > stock_quantity) {
    console.log("Insufficient Stock quantity!".red);
    console.log("Stock available: " + stock_quantity);
  }
  var query = 'UPDATE products SET stock_quantity = stock_quantity -' 
  + '\'' + amount + '\'' + 'WHERE item_id = ?';
  connection.query(query, [item], 
  function(err, res) {
    if (err) throw err;
  });
};

//Export functions
module.exports = {
  queryData: queryData,
  getStockQuantity: getStockQuantity,
  getItemInfo: getItemInfo,
  updateCurrentProduct: updateCurrentProduct
} 