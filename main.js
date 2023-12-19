const express = require('express');
var mustacheExpress = require('mustache-express');
const cookieSession = require('cookie-session');
const recipes = require('./routes/recipes'); 

const app = express();
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache'); //extensão dos ficheiros das views
app.set('views', __dirname + '/views'); 

app.use(cookieSession({
    name: 'session',
    keys: ['secretKey'],
    maxAge: 24 * 60 * 60 * 1000, 
}));



function requireAuth(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        pageLoader(res, req, "login");
    }
}
//menu: [ { hrefHome: './home.mustache', hrefRecipes: './views/menu.mustache' } ], footer: "footer"
app.get('/', function (req, res) {
    
    res.render('home', { menu: "menu", footer: "footer"});
});

app.get('/add-recipe', function (req, res) {
    
    res.render('add-recipe', { menu: "menu", footer: "footer"});
});

app.get('/recipe-post', function (req, res) {
    
    res.render('recipe-post', { menu: "menu", footer: "footer"});
});

app.get('/all-recipes', function (req, res) {
    
    res.render('add-recipe', { menu: "menu", footer: "footer"});
});

app.get('/login', function (req, res) {
    res.render('login', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
});

app.post('/login', async (req, res) => {
    //colocar isso em outro ficheiro provavelmente com o exports e chamar a funcao aqui e prontos
    try {
        const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
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
});

app.get('/logout', (req, res) => {
    req.session = null;
    res.render('home', { menu: "menu", footer: "footer"});
});

app.get('/register', function (req, res) {
    
    res.render('register', { menu: "menu", footer: "footer"});
});

app.listen(8000, (err) => {
    if (err) {
        console.log('Error starting the server: ' + err);
    } else {
        console.log(`Server Running at: http://localhost:8000`);
    }
});

/*

console.log(insertData("user", {
    "username": "example_user",
    "email": "user@example.com",
    "password": "hashed_password_here"
}))
console.log(getAllData("user"))

*/