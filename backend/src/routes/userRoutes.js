const express = require('express');
const { signUp, signIn, changePassword } = require('../controllers/userController');

const router = express.Router();
router.post(`/register`, signUp);
router.post(`/signin`, signIn);
router.post(`/password/change`, changePassword)

module.exports = router;
