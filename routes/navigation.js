function loadNewPage(req, res, page, data = null) {
    switch (page) {
        case 'home':
            return res.render('home', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
        case 'login':
            return res.render('login', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
        case 'register':
            return res.render('register', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
        case 'add-ingredient':
            if(req.session.authenticated) {
                return res.render('add-ingredient', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
            }
            return res.render('login', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
        case 'recipe-post':
                return res.render('recipe-post', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
        case 'add-recipe':
            if(req.session.authenticated) {
                return res.render('add-recipe', { menu: [ { isLogged: req.session.authenticated } ], ingredients: data, footer: "footer"});
            }
            return res.render('login', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
        default:
            return res.render('home', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
    }
}

function capitalizeFirstLetter(text) {
    const lowercasedText = text.toLowerCase();
    const capitalizedText = lowercasedText.charAt(0).toUpperCase() + lowercasedText.slice(1);
    return capitalizedText;
}

function lowerCase(text) {
    const lowercasedText = text.toLowerCase();
    return lowercasedText
}


//menu: [ { hrefHome: './home.mustache', hrefRecipes: './views/menu.mustache' } ], footer: "footer"
module.exports = {
    loadNewPage, capitalizeFirstLetter, lowerCase
};