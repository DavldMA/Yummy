const express = require('express');
var mustacheExpress = require('mustache-express');
const recipes = require('./routes/recipes'); 

const app = express();
app.use(express.static(__dirname + '/public'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache'); //extensão dos ficheiros das views
app.set('views', __dirname + '/views'); 

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(8000, (err) => {
    if (err) {
        console.log('Error starting the server: ' + err);
    } else {
        console.log(`Server Running at: http://localhost:8000`);
    }
});

/*alter user 'root'@'localhost' identified with mysql_native_password by 'xdxdxd';
flush privileges; */

/*

console.log(insertData("user", {
    "username": "example_user",
    "email": "user@example.com",
    "password": "hashed_password_here"
}))
console.log(getAllData("user"))

*/