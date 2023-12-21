const connection = require('./connection'); 
const nav = require('./navigation');
const axios = require('axios');

async function postRecipe(req, res) {
    try {
        const recipeName = req.body.recipe;
        const authorName = req.body.author;
        const price = req.body.price;
        const time = req.body.time;
        const difficulty = req.body.difficulty;
        const category = req.body.category;
        const description = req.body.description;
        const image = req.body.imageData;
        
        //get array of ingredients and ammount of it
        const ingredients = req.body.ingredients instanceof Array
            ? req.body.ingredients
            : [req.body.ingredients];

        const ammounts = req.body.ammounts instanceof Array
            ? req.body.ammounts
            : [req.body.ammounts];

        const data= {
            recipe_name: recipeName,
            author: authorName,
            preparation_description: description,
            difficulty: difficulty,
            category: category,
            time: time,
            cost: price,
            image: image
        };

        const idRecipe = await connection.insertData("recipe", data)
        if(ingredients[0] != null) {
            for (let i = 0; i < ingredients.length; i++) {
                const result = await connection.getData("ingredient", "name", ingredients[i]);
                const idIngredient = result[0].id;
                const dataRecipe = {
                    quantity: ammounts[i],
                    recipe_id: idRecipe,
                    ingredient_id: idIngredient
                };
                await connection.insertData("recipe_ingredient", dataRecipe);
            }        
        }
        

        nav.loadNewPage(req, res, 'home');
    }
    catch (err) {
        console.log('Error retrieving recipe data:', err);
    }
}

async function apiRecipePostLoad(req, res) {
    try {
        const mealId = req.params.id;
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

        const response = await axios.get(apiUrl);
        
        nav.loadNewPage(req, res, "recipe-post", response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data from the API' });
    }
}


module.exports = {
    postRecipe, apiRecipePostLoad
};