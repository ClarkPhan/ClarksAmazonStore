// Import inquirer
var inquirer = require('inquirer');

// Import customer database
var bamazonCustomer = require('./bamazonCustomer.js');

function prompt() {
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
    // Decrement product by amount bought
    bamazonCustomer.updateCurrentProduct(res.product_id, res.units);
  });
}

prompt();