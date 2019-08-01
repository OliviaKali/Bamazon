DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INTEGER(10) NOT NULL,
  stock_quantity INTEGER (10) NOT NULL,
  product_sales INTEGER (10) DEFAULT 0 NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "Technology", 1500, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("rocking chair", "Furniture", 300, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone5", "Technology", 200, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Psychology Textbook", "Books", 150, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Legally Blonde DVD", "Movies", 25, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mulan DVD", "Movies", 25, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pride and Prejudice Book", "Books", 5, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vintage SuperMan Shirt", "Clothes", 15, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Technology", 1000, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hamlet Sweatshirt", "Clothes", 35, 100);

SELECT * FROM products;

CREATE TABLE departments (
  department_id INTEGER NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs INTEGER(10) NOT NULL,
  PRIMARY KEY (department_id)
);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothes", 2000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Technology", 1000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Books", 1000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Movies", 500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Furniture", 5000);

SELECT * FROM departments



