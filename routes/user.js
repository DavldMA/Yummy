const connection = require("./connection")

function getLogin(req, res) {
    connection.loadNewPage(req, res, "login");
}

async function postLogin(req, res) {
    try {
        const sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
        const result = await connection.query(sql, [req.body.gmail, req.body.password]);
        
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
    connection.loadNewPage(req, res, "register");
}

function postRegister(req, res) {
    connection.loadNewPage(req, res, "register");
}

function getLogout(req, res) {
    req.session = null;
    connection.loadNewPage(res, req, "home")
}

module.exports = {
    getLogin, postLogin, getRegister, postRegister, getLogout
};