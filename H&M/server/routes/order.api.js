const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const orderController = require('../controllers/order.controller');

router.get('/orderList', authController.authenticate, orderController.getOrderList);

router.post('/', authController.authenticate, orderController.createOrder);

module.exports = router;
