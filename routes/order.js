const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/v1/order/:orderId', orderController.getOrderByOrderId);
router.get('/v1/order/user/:userId', orderController.getOrderByUserId);
router.post('/v1/order', orderController.placeOrder);
router.delete('/v1/order/:orderId', orderController.deleteOrder);


module.exports = router;
