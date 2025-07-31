const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

router.get('/healthcheck', healthController.getHealthStatus);
router.get('/ping', healthController.getPing);

module.exports = router;
