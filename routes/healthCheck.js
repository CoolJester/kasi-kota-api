const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

router.get('/v1/healthcheck', healthController.getHealthStatus);
router.get('/v1/ping', healthController.getPing);

module.exports = router;
