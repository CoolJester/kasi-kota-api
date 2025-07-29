const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/v1/menu', menuController.getMenu);

module.exports = router;
