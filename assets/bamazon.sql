DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255),
  department_name VARCHAR(255),
  price DECIMAL (10,2) DEFAULT 0,
  stock_quantity INTEGER (10) DEFAULT 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Pencil', 'School Supplies', 3.50, 69);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('USB Cable', 'Cable Management', 7.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Gucci Bag', 'Apparel', 3000, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Headphones', 'Audio Devices', 149.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Mouse', 'Computer Devices', 19.99, 12);

SELECT * FROM products;