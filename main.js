const express = require('express');
const mysql = require('mysql');


const app = express();
//app.use(express.static(path.join(__dirname, 'www')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const con = mysql.createConnection({
    host: 'localhost',
    database: 'receitas',
    user: 'root',
    password: 'xdxdxd',
    port: '3306'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


async function query(sql, values = []) {
    return new Promise((resolve, reject) => {
        con.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
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

async function getDataById(table, id) {
    try {
        const sql = `SELECT * FROM ${table} WHERE id = ?`;
        const result = await query(sql, id);
        return(result);
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