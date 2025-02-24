const express = require('express');

const router = express.Router();

test = async (req, res) => {
    res.status(200).json({ message: 'ok'});
};

router.get(`/ingredients/register`, test);



module.exports = router;
