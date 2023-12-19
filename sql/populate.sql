-- Populate user table
INSERT INTO user (gmail, password) VALUES
    ('user1@gmail.com', 'password1'),
    ('user2@gmail.com', 'password2'),
    ('user3@gmail.com', 'password3'),
    ('user4@gmail.com', 'password4'),
    ('user5@gmail.com', 'password5');

-- Populate ingredient table
INSERT INTO ingredient (name) VALUES
    ('Ingredient1'),
    ('Ingredient2'),
    ('Ingredient3'),
    ('Ingredient4'),
    ('Ingredient5');

-- Populate recipe table
INSERT INTO recipe (recipe_name, author, preparation_description, difficulty, category, time, cost) VALUES
    ('Recipe1', 'Author1', 'Description1', 'Expert', 'Breakfast', 30, 10.99),
    ('Recipe2', 'Author2', 'Description2', 'Intermediate', 'Desserts', 45, 15.99),
    ('Recipe3', 'Author3', 'Description3', 'Beginner', 'Dinner', 60, 20.99),
    ('Recipe4', 'Author4', 'Description4', 'Beginner', 'Breakfast', 40, 12.99),
    ('Recipe5', 'Author5', 'Description5', 'Intermediate', 'Lunch', 25, 8.99);

-- Populate recipe_ingredient table
INSERT INTO recipe_ingredient (quantity, recipe_id, ingredient_id) VALUES
    ('1 cup', 1, 1),
    ('2 cups', 1, 2),
    ('3 cups', 2, 3),
    ('4 cups', 2, 4),
    ('5 cups', 3, 5),
    ('1 tbsp', 3, 1),
    ('2 tbsp', 4, 2),
    ('3 tbsp', 4, 3),
    ('4 tbsp', 5, 4),
    ('5 tbsp', 5, 5);
