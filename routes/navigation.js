function loadNewPage(req, res, page) {
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
        default:
            return res.render('home', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
    }
}


//menu: [ { hrefHome: './home.mustache', hrefRecipes: './views/menu.mustache' } ], footer: "footer"
module.exports = {
    loadNewPage
};