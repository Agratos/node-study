const exporess = require('express');
const router = exporess.Router();
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');

router.get('/', authController.authenticate, userController.getUser);

router.post('/register', userController.createUser);

router.post('/login', userController.loginWithEmail);

module.exports = router;
