const exporess = require('express');
const router = exporess.Router();

const authController = require('../controllers/auth.controller');

router.post('/login', authController.loginWithEmail);

module.exports = router;
