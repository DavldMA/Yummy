const connection = require("./connection")
const nav = require('./navigation');
const recipes = require('./recipes');

async function postLogin(req, res) {
    try {
        const result = await connection.getData("user", "gmail", nav.lowerCase(req.body.gmail), "password", req.body.password);
        if (result.length > 0) {
            req.session.authenticated = true;
            let data = await recipes.getFourRecipes();
            return nav.loadNewPage(req, res, "home", data);
        } else {
            let data = await recipes.getFourRecipes();
            nav.loadNewPage(req, res, "home", data, "", "", "Error trying to login.");
        }
    } catch (err) {
        console.log('Error retrieving user data:', err);
    }
}

async function postRegister(req, res) {
    try {
        const result = await connection.getData("user", "gmail", nav.lowerCase(req.body.gmail));
        if (result.length === 0) {
            const data = {gmail: nav.lowerCase(req.body.gmail), password: req.body.password}
            await connection.insertData("user", data)
        }
        nav.loadNewPage(req, res, "login");
    }
    catch (err) {
        console.log('Error retrieving user data:', err);
        let data = await recipes.getFourRecipes();
        nav.loadNewPage(req, res, "home", data, "", "", "Error trying to create an account.");
    }
}


module.exports = {
    postLogin, postRegister
};