const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/order/:orderId', orderController.getOrderByOrderId);
router.get('/order/user/:userId', orderController.getOrderByUserId);
router.post('/order', orderController.placeOrder);
router.delete('/order/:orderId', orderController.deleteOrder);


module.exports = router;
