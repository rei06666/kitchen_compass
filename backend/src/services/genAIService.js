const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// レシピを作れるかどうかを確認
exports.checkIfCanMakeRecipe = async (recipeIngredienttext, Ingredientstext) => {
    const prompt = `以下の材料を使ってレシピを作ることができますか？もし作れない場合、足りない材料を教えてください。
レシピの材料: ${recipeIngredienttext}
持っている食材: ${Ingredientstext}
結果は以下の形式で返してください:
result: <trueかfalse>
insufficient material: <材料のリスト>`;

    const promptResult = await model.generateContent(prompt);
    const response = await promptResult.response;
    const text = await response.text();
    

    // レスポンスを解析して、作れるかどうかと足りない材料を抽出
    const resultMatch = text.match(/result: (true|false)/);
    const canMake = resultMatch && resultMatch[1] === 'true';
    let missingIngredients = [];
    const missingIngredientsMatch = text.match(/insufficient material: (.*)/);
    if (missingIngredientsMatch && missingIngredientsMatch[1]) {
        missingIngredients = missingIngredientsMatch[1].split(',').map(ingredient => ingredient.trim());
    }

    return {
        canMake,
        missingIngredients
    };
};