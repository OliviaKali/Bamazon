DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INTEGER(10) NOT NULL,
  stock_quantity INTEGER (10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "Technology", 1500, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("rocking chair", "Furniture", 300, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone5", "Techngology", 200, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Psychology Textbook", "Books", 150, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Used Piano", "Music", 3000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gameboy with Pokemon Silver Game", "Miscallenous", 500, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pride and Prejudice", "Books", 5, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vintage SuperMan Shirt", "Clothes", 15, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Technology", 1000, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lighter from Prague", "Miscellaneous", 3, 10);

SELECT * FROM products