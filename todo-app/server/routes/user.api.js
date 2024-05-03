const exporess = require('express');
const router = exporess.Router();
const userController = require('../controller/user.controller');

router.post('/', userController.createUser);

router.post('/login', userController.loginWithEmail);

module.exports = router;
