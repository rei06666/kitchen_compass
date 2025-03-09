
const { getIngredientsFromDB, addIngredientsToDB, deleteIngredientsFromDB } = require('../services/dbService');
const vision = require('@google-cloud/vision');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const client = new vision.ImageAnnotatorClient();

// 食材データを取得
exports.getIngredients = async (req, res) => {
  try {
    const { username } = req.query;
    const sql = 'SELECT * FROM ingredients WHERE user_name = ?';
    const result = await getIngredientsFromDB(sql, username);
    
    res.status(200).json({ 
      message: 'ok',
      ingredients: result.rows
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
}

// 食材データを追加
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

// 食材データを削除
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

// レシートから食材を抽出
exports.extractIngredientsFromReceipt = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Google Cloud Vision APIを使用して画像から文字列を抽出
    const [result] = await client.textDetection(file.buffer);
    const detections = result.textAnnotations;
    const extractedText = detections.map(text => text.description).join(' ');

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = `Extract only raw ingredients from the following text and return a JSON array.
    Do NOT include processed foods, drinks, or non-ingredient items.

    The response MUST be a valid JSON array **without markdown or additional text**.
    Do NOT include any other text in your response.

    Each ingredient should have the following keys:
    - "name": (string) ingredient name in Japanese
    - "amount": (number) quantity
    - "unit": (string) measurement unit (e.g., "個", "g", "ml")

    If "unit" is missing, set a reasonable default (e.g., "g" for vegetables).

    ### Expected Output Format (Nothing Else Should Be Included):
    [
      {
        "name": "大根",
        "amount": 1
        "unit": "個"
      },
      {
        "name": "牛乳",
        "amount": 1000,
        "unit": "ml"
      }
    ]

    ### Input Text:
    ${extractedText}`;


    const promptResult = await model.generateContent(prompt);
    const response = await promptResult.response;
    const text = response.text();

    // コードブロック(```json ... ```)を除去する
    let jsonString = text.trim();
    jsonString = jsonString.replace(/^```json/, "").replace(/```$/, "").trim();

    // ここでGemini APIのレスポンスから食材データを抽出
    const ingredients = JSON.parse(jsonString);
    

    res.status(200).json({ 
      message: 'ok',
      ingredients
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ code: 500, message: error.message });
  }
}

