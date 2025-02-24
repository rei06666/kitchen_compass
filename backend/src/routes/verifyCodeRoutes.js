const express = require('express');
const { sendVerifyCode } = require('../controllers/verifyCodeController');

const router = express.Router();
router.post(`/`, sendVerifyCode);

module.exports = router;
