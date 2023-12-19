const mysql = require('mysql2');

const connection = {
    host: 'localhost',
    database: 'recipesDB',
    user: 'root',
    password: 'xdxdxd',
    port: '3306'
};


// creating query function to reduce the ammount of code
async function query(sql, values = []) {
    var con = mysql.createConnection(connection)
    con.connect();
    let promise = new Promise((resolve, reject) => {
        con.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        
    });
    con.end();
    return promise;
}


async function insertData(table, data) {
    try {
        const sql = `INSERT INTO ${table} SET ?`;
        const result = await query(sql, data);
        const insertedId = result.insertId;
        console.log('Data inserted successfully.');
        return insertedId;
    } catch (err) {
        console.log('Error inserting data: ' + err);
        throw err; // Rethrow the error to be caught by the caller
    }
}

async function deleteDataById(table, id) {
    try {
        const sql = `DELETE FROM ${table} WHERE id = ?`;
        await query(sql, id);
        console.log('Data deleted successfully');
    } catch (err) {
        console.log('Error deleting data: ' + err);
    }
}

async function editDataById(table, id, data) {
    try {
        const sql = `UPDATE ${table} SET ? WHERE id = ?`;
        await query(sql, [data, id]);
        console.log('Data updated successfully');
    } catch (err) {
        console.log('Error updating data: ' + err);
    }
}

async function getData(table, param = null, value = null, param2 = null, value2 = null) {
    try {
        let sql = `SELECT * FROM ${table}`;
        const values = [];

        if (param !== null && value !== null) {
            sql += ` WHERE ${param} = ?`;
            values.push(value);
        }

        if (param2 !== null && value2 !== null) {
            if (values.length === 0) {
                sql += ` WHERE ${param2} = ?`;
            } else {
                sql += ` AND ${param2} = ?`;
            }
            values.push(value2);
        }

        const result = await query(sql, values);
        return result;
    } catch (err) {
        console.log('Error retrieving data: ' + err);
    }
}



async function deleteAllData(table) {
    try {
        const sql = `DELETE FROM ${table}`;
        await query(sql);
        console.log('All data deleted successfully');
    } catch (err) {
        console.log('Error deleting data: ' + err);
    }
}

async function getAllData(table) {
    try {
        const sql = `SELECT * FROM ${table}`;
        const result = await query(sql);
        return(result);
    } catch (err) {
        console.log('Error accessing database: ' + err);
    }
}

function requireAuth(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        pageLoader(res, req, "login");
    }
}

function loadNewPage(req, res, page) {
    switch (page) {
        case 'home':
            return res.render('home', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
        case 'login':
            return res.render('login', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
        case 'register':
            return res.render('register', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
        default:
            return res.render('home', { menu: [ { isLogged: req.session.authenticated } ], footer: "footer"});
    }
}
//console.log(getData("user", "password", "password1", "id", 1))
module.exports = {
    getAllData, deleteAllData, getData, editDataById, deleteDataById, insertData, query, requireAuth, loadNewPage
};