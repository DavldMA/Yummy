-- Populate user table
INSERT INTO user (username, gmail, password) VALUES
    ('user1', 'user1@gmail.com', 'password1'),
    ('user2', 'user2@gmail.com', 'password2'),
    ('user3', 'user3@gmail.com', 'password3'),
    ('user4', 'user4@gmail.com', 'password4'),
    ('user5', 'user5@gmail.com', 'password5');

-- Populate ingredient table
INSERT INTO ingredient (name, quantity) VALUES
    ('Ingredient1', '100g'),
    ('Ingredient2', '2 cups'),
    ('Ingredient3', '1 piece'),
    ('Ingredient4', '250ml'),
    ('Ingredient5', '3 tablespoons');

-- Populate recipe table
INSERT INTO recipe (recipe_name, author, preparation_description, difficulty, category, time, cost) VALUES
    ('Recipe1', 'Author1', 'Description1', 'Easy', 'Category1', 30, 15.99),
    ('Recipe2', 'Author2', 'Description2', 'Medium', 'Category2', 45, 25.50),
    ('Recipe3', 'Author3', 'Description3', 'Hard', 'Category1', 60, 35.75),
    ('Recipe4', 'Author4', 'Description4', 'Medium', 'Category3', 40, 20.00),
    ('Recipe5', 'Author5', 'Description5', 'Easy', 'Category2', 20, 12.50);

-- Populate recipe_ingredient table
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES
    (1, 1),
    (1, 2),
    (2, 2),
    (2, 3),
    (3, 1),
    (3, 4),
    (4, 2),
    (4, 5),
    (5, 1),
    (5, 3);
