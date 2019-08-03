# Bamazon

Bamazon is a node application that uses a mysql database. It is an Amazon-like storefront. The app takes orders from customers and changes the information in the mysql database based on what and how much the customer buys. Additionally, the Manager of Bamazon is able to keep track of their products inventory so they can view what products they have, which products have a low inventory, add to the current inventories as well as add additional products.

Example of Bamazon: https://youtu.be/VIHh1b3DWKU

[![Video of Bamazon](https://img.youtube.com/vi/VIHh1b3DWKU/0.jpg)](https://youtu.be/VIHh1b3DWKU)

##Technologies Used

Built with mysql database and used three NPM packages(NPM INQUIRER, NPM MYSQL, AND NPM CLI TABLE)

## Bamazon Customer

Bamazon Customer displays a table with the products information from the mysql database. The table includes item_id, product_name, department_name, price, and stock_quantity, however, the customer is only shown a table with the item_id, product_name, and price. The customer is then promoted what item they would like to buy. Once they answer, then they are promoted with another question asking how many units they would like to purchase. If the customer picks an amount equal or under the stock_quantity, the order is successfully placed and mysql database is updated to reflect the current inventory.

```javascript
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
```

<img src="images/bamazonCustomer.PNG" width="500">

If the customer wants to buy more stock than is available, the order will not go through and the customer will be prompted again if they would like to try again.

<img src="images/bamazonCustomer-2.PNG" width="500">

## Bamazon Manager

Bamazon Manager prompts the manager with the following options: 
<img src="images/bamazonManagerPrompt.PNG" width="500">

View Products uses the same function from BamazonCustomer to display the table, however, all of the columns are displayed unlike the customer one.

<img src="images/bamazonManagerViewProducts.PNG" width="500">