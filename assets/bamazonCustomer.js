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
  var stock_quantity = 0;
  connection.query("SELECT * FROM products WHERE item_id =?", [id], function(err, res) {
    // Get stock quantity
    stock_quantity = parseInt(res[0].stock_quantity);
    if (stock_quantity > 0) {
      console.log('Stock quantity: ' + stock_quantity);
    } else {
      console.log("Product out of stock!".red);
    }
  })
  //#TODO GET STOCK QUANTITY OUTSIDE OF CONNECTION QUERY TO HERE 
  return stock_quantity;
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
  connection.query("SELECT * FROM products WHERE item_id =?", [item], function(err, res) {
    // Get stock quantity
    var stock_quantity = parseInt(res[0].stock_quantity);
    if (stock_quantity > 0) {
      print(res);
      console.log('Stock quantity: ' + stock_quantity);
      console.log('Units purchased: ' + amount);
      // If amount bought is more than what's in stock, display err msg
      if (amount > stock_quantity) {
        console.log("Insufficient Stock Quantity!".red);
        return;
      } else {
        console.log('Updating stock..'.yellow);
        var query = 'UPDATE products SET stock_quantity = stock_quantity -' 
        + '\'' + amount + '\'' + 'WHERE item_id = ?';
        connection.query(query, [item], 
        function(err, res) {
          if (err) throw err;
        });
      }
    } else {
      console.log("Product out of stock!".red);
    }
  })
}

//Export functions
module.exports = {
  queryData: queryData,
  getStockQuantity: getStockQuantity,
  getItemInfo: getItemInfo,
  updateCurrentProduct: updateCurrentProduct
} 