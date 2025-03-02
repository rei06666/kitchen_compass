
const { getIngredientsFromDB, addIngredientsToDB, deleteIngredientsFromDB } = require('../services/dbService');

exports.getIngredients = async (req, res) => {
  try {
    const { username } = req.query;
    const sql = 'SELECT * FROM ingredients WHERE user_name = ?';
    const result = await getIngredientsFromDB(sql, username);
    console.log(result.rows)
    
    res.status(200).json({ 
      message: 'ok',
      ingredients: result.rows
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
}

exports.addIngredients = async (req, res) => {
  try {
    const { username, ingredients } = req.body;
    if (!username || !ingredients || !Array.isArray(ingredients)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }
    const sql = 'INSERT OR REPLACE INTO ingredients (name, amount, unit, deadline, user_name, id) VALUES (?, ?, ?, ?, ?, ?)';
    const result = await addIngredientsToDB(sql, ingredients, username);
    res.status(200).json({ 
      message: 'ok'
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
}

exports.deleteIngredients = async (req, res) => {
  try {
    const { username, ingredients } = req.body;
    if (!username || !ingredients || !Array.isArray(ingredients)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }
    const sql = 'DELETE FROM ingredients WHERE user_name = ? AND id = ?';
    const result = await deleteIngredientsFromDB(sql, ingredients, username);
    res.status(200).json({ 
      message: 'ok'
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
}

