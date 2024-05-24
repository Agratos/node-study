const exporess = require('express');
const router = exporess.Router();

const authController = require('../controllers/auth.controller');
const productController = require('../controllers/product.controller');

router.post(
	'/create',
	authController.authenticate,
	authController.checkAdminPermission,
	productController.createProduct
);

router.get('/', productController.getProducts);

module.exports = router;
