// Import inquirer
var inquirer = require('inquirer');

// Import customer database
var bamazonCustomer = require('./bamazonCustomer.js');

function prompt() {
  // Sleep time expects milliseconds
  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  bamazonCustomer.queryData();
  sleep(1000).then(() => {
    inquirer.prompt([
      {
        type: 'input',
        message: 'Please enter product id:',
        name: 'product_id',
        validate: function validateID(name) {
          return name !== '';
        }
      },
      {
        type: 'input',
        message: 'How many units would you like to buy?',
        name: 'units',
        validate: function validateUnit(name) {
          return name !== '';
        }
      }
    ]).then(function(res) {
      //Decrement product by amount bought
      bamazonCustomer.updateCurrentProduct(res.product_id, res.units);
      // Sleep time expects milliseconds
      function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }
  
      // Sleep for 3 seconds, then prompt again.
      sleep(2000).then(() => {
        prompt();
      });
    });
  });
}
prompt();