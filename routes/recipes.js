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
        

        let data2 = await getFourRecipes();
        return nav.loadNewPage(req, res, "home", data2);
    }
    catch (err) {
        console.log('Error retrieving recipe data:', err);
    }
}

async function getFourRecipes() {
    const jsonArray = [];
    for(let i = 1; i < 5; i++) {
        const r = await connection.getData("recipe", "id", i);
        jsonArray.push(r[0]);
    }
    return jsonArray;
}

async function recipePostLoad(req, res, toReturn = false) {
    try {
        const namesArray = [];
        const ingredientArray = [];
        const result = await connection.getData("recipe", "id", req.params.id);
        const resultAux = await connection.getData("recipe_ingredient", "recipe_id", req.params.id);
        for(let i = 0; i< resultAux.length; i++) {
            const r = await connection.getData("ingredient", "id", resultAux[i].ingredient_id);
            namesArray.push(r[0].name);
            ingredientArray.push(r[0])
        }
        if (result.length === 0) {
            let data = await getFourRecipes();
            return nav.loadNewPage(req, res, "home", data);
        }
        if (toReturn) {
            return result[0], ingredientArray;
        }
        nav.loadNewPage(req, res, "recipe-post", result[0], namesArray);
    }
    catch (err) {
        console.log('Error retrieving recipe data:', err);
    }
}

async function deleteRecipe(req, res) {
    recipePostLoad(req, res)
    await connection.deleteDataById("recipe", req.params.id)
}

async function editRecipe(req, res) {
    const result = await connection.getData("recipe", "id", req.params.id);
    const ingredients = await connection.getData("ingredient");
    nav.loadNewPage(req, res, "edit-recipe", result[0], ingredients);
}

async function editRecipeUpdate(req, res) {
    const id = req.params.id;
    const recipeName = req.body.recipe;
    const authorName = req.body.author;
    const price = req.body.price;
    const time = req.body.time;
    const difficulty = req.body.difficulty;
    const category = req.body.category;
    const description = req.body.description;
    const image = req.body.imageData;

    //get array of ingredients and amount of it
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

    // Update the recipe in the database using the id
    await connection.editDataById("recipe", id, data);

    // Delete old ingredients for the recipe
    await connection.deleteDataById("recipe_ingredient", id);

    // Add new ingredients for the recipe
    if(ingredients[0] != null) {
        for (let i = 0; i < ingredients.length; i++) {
            const result = await connection.getData("ingredient", "name", ingredients[i]);
            const idIngredient = result[0].id;
            const dataRecipe = {
                quantity: ammounts[i],
                recipe_id: id,
                ingredient_id: idIngredient
            };
            await connection.insertData("recipe_ingredient", dataRecipe);
        }        
    }

    let data2 = await getFourRecipes();
    return nav.loadNewPage(req, res, "home", data2);
}


async function apiRecipePostLoad(req, res) {
    try {
        const mealId = req.params.id;
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

        const response = await axios.get(apiUrl);
        
        nav.loadNewPage(req, res, "recipe-postAPI", response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data from the API' });
    }
}

async function getAllRecipes() {
    const recipe = await connection.getData("recipe");
    return recipe;
}

async function getRecipesWithFilter(req, res, newFilter = true) {
    if(newFilter) {
        req.session.difficulty = req.body.difficulty;
        req.session.category = req.body.category;
    }
    if(req.session.difficulty != "none" && req.session.category != "none") {
        recipe = await connection.getData("recipe", "difficulty", req.session.difficulty, "category", req.session.category);
    }
    else if(req.session.difficulty != "none") {
        recipe = await connection.getData("recipe", "difficulty", req.session.difficulty);
    }
    else if(req.session.category != "none") {
        recipe = await connection.getData("recipe", "category", req.session.category);
    }
    else {
        recipe = await connection.getData("recipe");
    }
    return recipe;
}

module.exports = {
    postRecipe, apiRecipePostLoad, getFourRecipes, recipePostLoad, getAllRecipes, getRecipesWithFilter, deleteRecipe, editRecipe, editRecipeUpdate
};