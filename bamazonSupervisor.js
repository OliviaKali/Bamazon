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
            "View Products Sales by Department",
            "Create New Department",
            "EXIT"
          ]
        }
      ])
      .then(function(user) {
        switch (user.managerOptions) {
          case "View Products Sales by Department":
            viewSales();
            break;
          case "Create New Department":
            addDepartment();
            break;
          case "EXIT":
              connection.end();
          default:
            console.log("This line shouldn't be visible");
            break;
        }
      });
  }

  function viewSales() {
    connection.query(`SELECT 
        departments.department_id, 
        departments.department_name, 
        departments.over_head_costs, 
        products.product_sales, 
        IFNULL(products.product_sales, 0) as product_sales,
        IFNULL((products.product_sales - departments.over_head_costs), 0) AS total_profit 
    FROM products 
    RIGHT JOIN departments 
    ON 
        products.department_name = departments.department_name
    GROUP BY 
        departments.department_id, 
        departments.department_name, 
        departments.over_head_costs, 
        products.product_sales
    ORDER BY total_profit
    DESC`, function(err, results) {
      if (err) throw err;
       console.table(results);
        
    });
    connection.end();
  }

  function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "newDepartment",
          message: "What department would you like to add?"
        },
        {
          type: "number",
          name: "cost",
          message: "How much money would you like to add to the department?"
        }
      ])
      .then(function(answer) {
        addDept(
          answer.newDepartment,
          answer.cost
        );
      });
  }

  function addDept(newDepartment, cost) {
    console.log("\nInserting a new department...\n");
    connection.query(
      "INSERT INTO departments SET ?",
      {
        department_name: newDepartment,
        over_head_costs: cost
      },
      function(err, results) {
        if (err) throw err;
        console.log(`${newDepartment} has been added!\n`);
        connection.end();
      }
    );
  }