const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();
const db = new sqlite3.Database(process.env.DB_PATH);

exports.getIngredientsFromDB = async (sql, username) => {
    return new Promise((resolve, reject) => {
        db.all(sql, [username], (err, rows) => {
        if (err) {
            reject(err);
        }
        resolve({ rows });
        });
    });
}

exports.addIngredientsToDB = async (sql, ingredients, username) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
        const stmt = db.prepare(sql);
        ingredients.forEach((ingredient) => {
            stmt.run([
            ingredient.name,
            ingredient.amount,
            ingredient.unit,
            ingredient.deadline,
            username,
            ingredient.id
            ]);
        });
        stmt.finalize((err) => {
            if (err) {
            reject(err);
            }
            resolve();
        });
        });
    });
}

exports.deleteIngredientsFromDB = async (sql, ingredients, username) => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(sql);
        ingredients.forEach(ingredient => {
            stmt.run(username, ingredient.id, (err) => {
                if (err) {
                    reject(err);
                }
            });
        });
        stmt.finalize((err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}