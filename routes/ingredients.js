const connection = require("./connection")
const nav = require("./navigation")

async function postIngredient(req, res) {
    try {
        const result = await connection.getData("ingredient", "name", req.body.ingredient);
        if (result.length === 0) {
            const data = {name: req.body.ingredient}
            await connection.insertData("ingredient", data)
        }
        nav.loadNewPage(req, res, "home");
    }
    catch (err) {
        console.log('Error retrieving user data:', err);
    }
}

module.exports = {
    postIngredient
};