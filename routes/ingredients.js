const connection = require("./connection")
const recipes = require('./recipes');
const nav = require("./navigation")

async function postIngredient(req, res) {
    try {
        const result = await connection.getData("ingredient", "name", req.body.ingredient);
        if (result.length === 0) {
            const data = {name: nav.capitalizeFirstLetter(req.body.ingredient)}
            await connection.insertData("ingredient", data)
        }
        let data = await recipes.getFourRecipes();
        return nav.loadNewPage(req, res, "home", data);
    }
    catch (err) {
        console.log('Error retrieving ingredients data:', err);
    }
}

async function getAllIngredients(req, res){
    try {
        const result = await connection.getData("ingredient");
        return result;
    }
    catch (err) {
        console.log('Error retrieving ingredients data:', err);
    }
}

module.exports = {
    postIngredient, getAllIngredients
};