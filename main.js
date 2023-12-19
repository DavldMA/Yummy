const express = require('express');
const mustacheExpress = require('mustache-express');
const cookieSession = require('cookie-session');
const user = require('./routes/user'); 
const recipes = require('./routes/recipes');
const ingredients = require('./routes/ingredients')


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
    user.getLogin(req, res)
});

app.post('/login', async (req, res) => {
    await user.postLogin(req, res);
});

app.get('/register', function (req, res) {
    user.getRegister(req, res);
});

app.post('/register', function (req, res) {
    user.postRegister(req, res);
});

app.get('/logout', (req, res) => {
    user.getLogout(req, res);
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