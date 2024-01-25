function loadNewPage(req, res, page, data = null, data2 = null, error = null) {
    switch (page) {
        case 'home':
            data2 = []
            data2.push(data[2]);
            data2.push(data[3]);
            data.pop()
            data.pop()

            return res.render('home', { menu: [ { isLogged: req.session.authenticated } ], recipes: data, recipes2: data2, error: error, footer: "footer"});
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
            return res.render('recipe-post', { menu: [ { isLogged: req.session.authenticated } ], recipe: data, ingNames: data2, footer: "footer", isLogged: req.session.authenticated});
        case 'edit-recipe':
            if(req.session.authenticated) {
                return res.render('edit-recipe', { menu: [ { isLogged: req.session.authenticated } ], recipe: data, ingredients: data2, footer: "footer", isLogged: req.session.authenticated});
            }
        case 'recipe-postAPI':
            return res.render('recipe-postAPI', { menu: [ { isLogged: req.session.authenticated } ], recipe: data.meals[0], footer: "footer", isLogged: req.session.authenticated});
        case 'recipe-list':
            let recipesPerPage = 2;
            let currentPage = req.params.id;
            console.log(data)
            if(currentPage == undefined) {
                currentPage = 1;
            }
            
            let start = (currentPage - 1) * recipesPerPage;
            let end = start + recipesPerPage;
            let recipesToRender = data.slice(start, end);


            let totalPages = Math.ceil(data.length / recipesPerPage);
            let nextPage = currentPage < totalPages ? Number(currentPage) + 1 : null;
            let prevPage = currentPage > 1 ? Number(currentPage) - 1 : null;
            return res.render('recipe-list', { menu: [ { isLogged: req.session.authenticated } ], filter: data2, recipes: recipesToRender, nextPage: nextPage, prevPage: prevPage, footer: "footer"});
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