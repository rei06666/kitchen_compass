const { getIngredientsFromDB, getRecipeByIds } = require('../services/dbService');
const { checkIfCanMakeRecipe } = require('../services/genAIService');

const axios = require('axios');



exports.recommend = async (req, res) => {
    try {
        const { request, username, mode, menucount } = req.body;

        // Flask APIサーバーにリクエストを送信
        const response = await axios.post(`${process.env.RECOMMENDATION_API_URL}/search`, { query: request, menucount: menucount} );
        const recipe_ids = response.data['data'];

        // ユーザーの食材をすべて取得（名前と期限のみ）
        const sql = 'SELECT * FROM ingredients WHERE user_name = ?';
        const ingredientRows = await getIngredientsFromDB(sql, username);
        const userIngredients = ingredientRows.rows;

        // recipe_idsからrecipeDBに対してクエリを投げ、材料を取得
        const recipes = await getRecipeByIds(recipe_ids);

        let recommendedRecipes = [];
        let availableIngredients = [];

        for (const recipe of recipes) {
            const recipeIngredienttext = recipe.material.replace(/[○♡☆*★<>◇■⚪️●◎＊※⭐︎▲【】『』．・；’「」｀＼\.~!@#\$%\^&\*\(\)_\+\-=\{\}\[\]:;"'<>?\\\/\|]/g, '');
            // 食材をリストにする
            recipe.material = recipeIngredienttext.split(',');

            if (mode === 1) {
                // 食材が家にあって期限切れでない
                availableIngredients = userIngredients.filter(ingredient => 
                    new Date(ingredient.deadline) > new Date()
                );
            } else if (mode === 2) {
                // 食材は家にはある（期限切れも含む）
                availableIngredients = userIngredients
            } else if (mode === 3) {
                // 家になくてもいい
                recipe.canMake = true;
                recommendedRecipes.push(recipe);
                continue;
            }
            const availableIngredientsNames = availableIngredients.map(ingredient => ingredient.name);
            const availableIngredientstext = availableIngredientsNames.join(',');
            const { canMake, missingIngredients: missingIngredientList } = await checkIfCanMakeRecipe(recipeIngredienttext, availableIngredientstext);

            recipe.canMake = canMake;
            recipe.missingIngredients = missingIngredientList;
            recommendedRecipes.push(recipe);
        }
        // レシピからvectorとpreprocessed_textを削除
        recommendedRecipes = recommendedRecipes.map(recipe => {
            delete recipe.vector;
            delete recipe.preprocessed_description;
            return recipe;
        });
        // 
        res.status(200).json({
            message: "ok",
            menus: recommendedRecipes,
        });
    } catch (error) {
        res.status(500).json({ code: 500, message: error.message });
    }
};