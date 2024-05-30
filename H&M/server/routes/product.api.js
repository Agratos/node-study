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
router.get('/new-sku', authController.authenticate, authController.checkAdminPermission, productController.getNewSku);
router.get(
	'/:id',
	authController.authenticate,
	authController.checkAdminPermission,
	productController.getProductDetail
);
router.get('/', productController.getProducts);

router.put('/:id', authController.authenticate, authController.checkAdminPermission, productController.updateProduct);

router.delete(
	'/:id',
	authController.authenticate,
	authController.checkAdminPermission,
	productController.deleteProduct
);

module.exports = router;
