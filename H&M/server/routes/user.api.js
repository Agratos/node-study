const exporess = require('express');
const router = exporess.Router();

const userController = require('../controllers/user.controller');

router.post('/', userController.createUser);

module.exports = router;
