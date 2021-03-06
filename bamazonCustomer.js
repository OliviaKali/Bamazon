var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("\nWelcome to Bamazon!\n");
  display();
  start();
});

function display() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
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
    inquirer
      .prompt([
        {
          name: "item",
          type: "number",
          message:
            "What item would you like to purchase? Please provide the ID #."
        },
        {
          name: "amount",
          type: "number",
          message: "How many units would you like to purchase?"
        }
      ])
      .then(function(answer) {
        var ChosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.item) {
            chosenItem = results[i];
          }
        }
        if (chosenItem.stock_quantity < parseInt(answer.amount)) {
          console.log("\nInsufficient quantity! Order not processed. Please try again." 
                    + "\n-------------------------------------------------------------\n");
          inquirer
            .prompt([
              {
                name: "tryAgain",
                type: "list",
                message: "Would you like to try to make another purchase?",
                choices: ["YES", "NO"]
              }
            ])
            .then(function(user) {
              if (user.tryAgain === "YES") {
                start();
              } else {
                connection.end();
              }
            });
        } else if (chosenItem.stock_quantity >= parseInt(answer.amount)) {
          console.log(
            "\nOrder successfully placed!" +
              "\n\nYou have purchased a total of: " +
              parseInt(answer.amount) +
              " " +
              chosenItem.product_name +
              "\n\nYour total cost is: " +
              answer.amount * chosenItem.price
          );
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity:
                  chosenItem.stock_quantity - parseInt(answer.amount)
              },
              {
                item_id: answer.item
              }
            ],
            function(err) {
              if (err) throw err;
              console.log(
                "\nThere are " +
                  (chosenItem.stock_quantity - parseInt(answer.amount)) +
                  " " +
                  chosenItem.product_name +
                  "s left."
              );
              connection.end();
            }
          );
        }
      });
  });
}
