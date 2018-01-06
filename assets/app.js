// Import inquirer
var inquirer = require('inquirer');

// Import customer database
var bamazonCustomer = require('./bamazonCustomer.js');

function prompt(){
  inquirer.prompt([
    {
      type: 'input',
      message: 'Please enter product id: ',
      name: 'product_id',
      validate: function validateID(name) {
        return name !== '';
      }
    }
  ]).then(function(res) {
  });
}

prompt();