const exporess = require('express');
const router = exporess.Router();

const todoApi = require('./todos.api');
const userApi = require('./user.api');

router.use('/todos', todoApi);
router.use('/user', userApi);
router.get('/test', (req, res) => {
	res.send('Server Success');
});

module.exports = router;
