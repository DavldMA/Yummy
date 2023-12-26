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
        return insertedId;
    } catch (err) {
        console.log('Error inserting data: ' + err);
    }
}

async function deleteDataById(table, id) {
    try {
        if (table === 'recipe') {
            const deleteIngredientsSql = 'DELETE FROM recipe_ingredient WHERE recipe_id = ?';
            await query(deleteIngredientsSql, id);
        }
        if (table === 'recipe_ingredient') {
            const deleteIngredientsSql = 'DELETE FROM recipe_ingredient WHERE recipe_id = ?';
            await query(deleteIngredientsSql, id);
        }
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

module.exports = {
    getData, editDataById, deleteDataById, insertData, query
};