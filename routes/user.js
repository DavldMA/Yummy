const connection = require("./connection")

function getLogin(req, res) {
    req.session.authenticated = false;
    connection.loadNewPage(req, res, "login");
}

async function postLogin(req, res) {
    try {
        const result = await connection.getData("user", "gmail", req.body.gmail, "password", req.body.password);
        if (result.length > 0) {
            req.session.authenticated = true;
            connection.loadNewPage(req, res, "home");
        } else {
            connection.loadNewPage(req, res, "login");
        }
    } catch (err) {
        console.log('Error retrieving user data:', err);
    }
}

function getRegister(req, res) {
    req.session.authenticated = false;
    connection.loadNewPage(req, res, "register");
}

async function postRegister(req, res) {
    try {
        const result = await connection.getData("user", "gmail", req.body.gmail);
        if (result.length === 0) {
            const data = {gmail: req.body.gmail, password: req.body.password}
            await connection.insertData("user", data)
        }
        connection.loadNewPage(req, res, "login");
    }
    catch (err) {
        console.log('Error retrieving user data:', err);
    }
}

function getLogout(req, res) {
    req.session.authenticated = false;
    connection.loadNewPage(req, res, "home")
}

module.exports = {
    getLogin, postLogin, getRegister, postRegister, getLogout
};