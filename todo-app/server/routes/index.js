const exporess = require('express');
const router = exporess.Router();

const todoApi = require('./todos.api');

router.use('/todos', todoApi);
router.get('/test', (req, res) => {
	res.send('Server Success');
});

module.exports = router;
