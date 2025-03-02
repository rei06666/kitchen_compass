const express = require('express');
const { getIngredients, addIngredients, deleteIngredients } = require('../controllers/ingredientController');

const router = express.Router();
router.get(`/`, getIngredients);
router.post(`/`, addIngredients);
router.delete(`/`, deleteIngredients);



module.exports = router;
