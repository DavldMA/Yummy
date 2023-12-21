const express = require('express');
const mustacheExpress = require('mustache-express');
const cookieSession = require('cookie-session');
const con = require('./routes/connection')
const user = require('./routes/user'); 
const recipes = require('./routes/recipes');
const ingredients = require('./routes/ingredients');
const nav = require('./routes/navigation');

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



app.get('/', function (req, res) {
    nav.loadNewPage(req, res, "home");
});


app.get('/add-ingredient', function (req, res) {
    nav.loadNewPage(req, res, "add-ingredient");
    
});

app.post('/add-ingredient', function (req, res) {
    
    ingredients.postIngredient(req, res);
});

app.get('/add-recipe', async (req, res) => {
    data = await ingredients.getAllIngredients(req, res);
    nav.loadNewPage(req, res, "add-recipe", data);
});

app.post('/add-recipe', async (req, res) => {
    recipes.postRecipe(req, res);
});

app.get('/recipe-post', function (req, res) {
    
    nav.loadNewPage(req, res, "recipe-post");
});

app.get('/all-recipes', function (req, res) {
    
    res.render('add-recipe', { menu: "menu", footer: "footer"});
});

app.get('/login', function (req, res) {
    req.session.authenticated = false;
    nav.loadNewPage(req, res, "login");
});

app.post('/login', async (req, res) => {
    await user.postLogin(req, res);
});

app.get('/register', function (req, res) {
    req.session.authenticated = false;
    nav.loadNewPage(req, res, "register");
});

app.post('/register', async (req, res) => {
    await user.postRegister(req, res);
});

app.get('/logout', function (req, res) {
    req.session.authenticated = false;
    nav.loadNewPage(req, res, "home")
});

app.listen(8000, (err) => {
    if (err) {
        console.log('Error starting the server: ' + err);
    } else {
        console.log(`Server Running at: http://localhost:8000`);
    }
});