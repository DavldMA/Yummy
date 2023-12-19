const connection = require("./connection")

function getLogin(req, res) {
    res.render('login', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
}

async function postLogin(req, res) {
    try {
        const sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
        const result = await connection.query(sql, [req.body.gmail, req.body.password]);
        
        if (result.length > 0) {
            req.session.authenticated = true;
            res.render('home', { menu: "menu", footer: "footer"});
        } else {
            res.render('login', { menu: "menu", footer: "footer"});
        }
    } catch (err) {
        console.log('Error retrieving user data:', err);
    }
}

function getRegister(req, res) {
    res.render('register', { menu: "menu", footer: "footer"});
}

function postRegister(req, res) {
    res.render('register', { menu: "menu", footer: "footer"});
}

function getLogout(req, res) {
    req.session = null;
    res.render('home', { menu: "menu", footer: "footer"});
}

module.exports = {
    getLogin, postLogin, getRegister, postRegister, getLogout
};