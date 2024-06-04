const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const orderController = require('../controllers/order.controller');

router.get(
	'/orderList',
	authController.authenticate,
	authController.checkAdminPermission,
	orderController.getOrderList
);

router.put('/:id', authController.authenticate, orderController.updateOrder);

router.get('/myOrder', authController.authenticate, orderController.getMyOrder);

router.post('/', authController.authenticate, orderController.createOrder);

module.exports = router;
