alter user 'root'@'localhost' identified with mysql_native_password by 'xdxdxd';
flush privileges;

-- Create the recipesDB database
CREATE DATABASE IF NOT EXISTS recipesDB;
USE recipesDB;

-- Create the user table
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gmail VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the ingredient table with quantity
CREATE TABLE IF NOT EXISTS ingredient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create the recipe table
CREATE TABLE IF NOT EXISTS recipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_name VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    preparation_description TEXT NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    time INT NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    image longblob NOT NULL
);

-- Create the recipe_ingredient table to connect recipe and ingredient
CREATE TABLE IF NOT EXISTS recipe_ingredient (
	id INT AUTO_INCREMENT PRIMARY KEY,
    quantity TEXT NOT NULL,
    recipe_id INT,
    ingredient_id INT,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
);
