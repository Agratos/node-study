const exporess = require('express');
const router = exporess.Router();

const favoriteController = require('../controllers/favorite.controller');
const authController = require('../controllers/auth.controller');

router.get('/', authController.authenticate, favoriteController.getFavorite);
router.put('/:id', authController.authenticate, favoriteController.updateFavorite);
router.delete('/:id', authController.authenticate, favoriteController.deleteFavorite);

module.exports = router;
