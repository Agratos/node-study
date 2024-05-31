const exporess = require('express');

const router = exporess.Router();
const authController = require('../controllers/auth.controller');
const cartController = require('../controllers/cart.controller');

router.delete('/:id', authController.authenticate, cartController.deleteCart);

router.put('/:id', authController.authenticate, cartController.updateCart);

router.post('/', authController.authenticate, cartController.addItemToCart);

router.get('/', authController.authenticate, cartController.getCart);

router.get('/qty', authController.authenticate, cartController.getCartItemCount);

module.exports = router;
