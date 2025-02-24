const express = require('express');
const userRoutes = require('./routes/userRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const verifyCodeRoutes = require('./routes/verifyCodeRoutes');
const verifyToken = require('./middlewate/authMiddlewate');
require('dotenv').config();
const port = process.env.PORT;

const app = express();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.json()); // JSONリクエストを扱えるようにする
// app.use(verifyToken); // トークンの検証ミドルウェアを使用
app.use(`/api/${process.env.API_VERSION}/user`, userRoutes); 
app.use(`/api/${process.env.API_VERSION}/verify-code`, verifyCodeRoutes); 
app.use(`/api/${process.env.API_VERSION}/ingredient`, ingredientRoutes); 


module.exports = app;
