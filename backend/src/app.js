const express = require('express');
const userRoutes = require('./routes/userRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const verifyCodeRoutes = require('./routes/verifyCodeRoutes');
const menuRoutes = require('./routes/menuRoutes');
const verifyToken = require('./middlewate/authMiddlewate');
require('dotenv').config();
const port = process.env.PORT;

const app = express();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.json()); // JSONリクエストを扱えるようにする

// ルーティング
// ユーザー関連のルーティング
app.use(`/api/${process.env.API_VERSION}/user`, userRoutes); 

// パスワードリセット関連のルーティング
app.use(`/api/${process.env.API_VERSION}/verify-code`, verifyCodeRoutes); 

// 食材関連のルーティング
app.use(`/api/${process.env.API_VERSION}/ingredient`, verifyToken, ingredientRoutes); 

// メニュー関連のルーティング
app.use(`/api/${process.env.API_VERSION}/menu`, verifyToken, menuRoutes); 


module.exports = app;
