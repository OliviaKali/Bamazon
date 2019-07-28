DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INTEGER(10) NOT NULL,
  stock_quantity INTEGER (10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "Technologies", 1500, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("rocking chair", "Furniture", 300, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

SELECT * FROM products