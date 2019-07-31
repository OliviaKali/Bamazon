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
  //   console.log("Welcome to Bamazon Management!");
  start();
});

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "managerOptions",
        message:
          "Welcome to Bamazon Management. What would you like to do today?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }
    ])
    .then(function(user) {
      switch (user.managerOptions) {
        case "View Products for Sale":
          productsSale();
          break;
        case "View Low Inventory":
          lowInventory();
          break;
        case "Add to Inventory":
          addToInventory();
          break;
        case "Add New Product":
          addNewProduct();
          break;
        default:
          console.log("This line shouldn't be visible");
          break;
      }
    });
}

function productsSale() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // console.log(results);
    var table = new Table({
      head: ["ID", "Product Name", "Price", "Stock Quantity"],
      colWidths: [10, 30, 10, 20]
    });

    for (var i = 0; i < results.length; i++) {
      table.push([
        results[i].item_id,
        results[i].product_name,
        results[i].price,
        results[i].stock_quantity
      ]);
    }
    console.log(table.toString());
  });
  connection.end();
}

function lowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(
    err,
    results
  ) {
    if (err) throw err;
    // console.log(results);
    var table = new Table({
      head: ["ID", "Product Name", "Price", "Stock Quantity"],
      colWidths: [10, 30, 10, 20]
    });

    for (var i = 0; i < results.length; i++) {
      table.push([
        results[i].item_id,
        results[i].product_name,
        results[i].price,
        results[i].stock_quantity
      ]);
    }
    console.log(table.toString());
  });
  connection.end();
}

function addToInventory() {
  connection.query("SELECT * FROM products", function(err, results) {
    inquirer
      .prompt([
        {
          type: "number",
          name: "addMore",
          message:
            "What item would you like to add inventory to? Please provide ID #."
        },
        {
          type: "number",
          name: "increaseInventory",
          message: "How many units would you like to add?"
        }
      ])
      .then(function(answer) {
        var ChosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.addMore) {
            chosenItem = results[i];
          }
        }
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity:
                chosenItem.stock_quantity + parseInt(answer.increaseInventory)
            },
            {
              item_id: answer.addMore
            }
          ],
          function(err) {
            if (err) throw err;
            console.log(
              `\nYou have added ${parseInt(
                answer.increaseInventory
              )} into the ${chosenItem.product_name}s into the Inventory. 
                      \nYou now have a total of ${chosenItem.stock_quantity +
                        parseInt(answer.increaseInventory)}.`
            );
            connection.end();
          }
        );
      });
  });
}

function addNewProduct() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newProduct",
        message: "What product would you like to add?"
      },
      {
        type: "input",
        name: "department",
        message: "What department does the product belong to?"
      },
      {
        type: "number",
        name: "cost",
        message: "How much will the new product cost?"
      },
      {
        type: "number",
        name: "quantity",
        message: "How much of the product would you like to add?"
      }
    ])
    .then(function(answer) {
      addItem(
        answer.newProduct,
        answer.department,
        answer.cost,
        answer.quantity
      );
    });
}

function addItem(newProduct, department, cost, quantity) {
  console.log("\nInserting a new product...\n");
  connection.query(
    "INSERT INTO products SET ?",
    {
      product_name: newProduct,
      department_name: department,
      price: cost,
      stock_quantity: quantity
    },
    function(err, results) {
      if (err) throw err;
      console.log(`${newProduct}s added!\n`);
      connection.end();
    }
  );
}
