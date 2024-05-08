const exporess = require('express');
const router = exporess.Router();

router.post('/', userController.createUser);

module.exports = router;
