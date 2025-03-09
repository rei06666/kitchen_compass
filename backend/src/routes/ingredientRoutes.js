const express = require('express');
const { getIngredients, addIngredients, deleteIngredients, extractIngredientsFromReceipt } = require('../controllers/ingredientController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get(`/`, getIngredients);
router.post(`/`, addIngredients);
router.delete(`/`, deleteIngredients);
router.post(`/extract`, upload.single('receipt'), extractIngredientsFromReceipt);

module.exports = router;