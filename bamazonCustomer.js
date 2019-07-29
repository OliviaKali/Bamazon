var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("Welcome to Bamazon!");
  display();
  start();
  connection.end();
});

function display() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // console.log(results);
    var table = new Table({
      head: ["ID", "Product Name", "Price"],
      colWidths: [10, 45, 10]
    });

    for (var i = 0; i < results.length; i++) {
      table.push([
        results[i].item_id,
        results[i].product_name,
        results[i].price
      ]);
    }
    console.log(table.toString());
  });
}

function start() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "productToBuy",
        type: "number",
        message:
          "What item would you like to purchase? Please provide the ID #."
      },
      {
        name: "amount",
        type: "number",
        message: "How much would you like to purchase?"
      }
    ]);
    // .then(function (answer) {
    //     var chosenItem = [];
    //     for (var i = 0; i < results.length; i++) {
    //        if (results[i].item_id === answer.proudctToBuy) {
    //            chosenItem = results[i].product_name
    //        }
    //     }
    //     if (chosenItem)
    // })
  });
}
