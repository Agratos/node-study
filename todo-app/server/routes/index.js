const exporess = require('express');
const router = exporess.Router();

const todoApi = require('./todos.api');

router.use('/todos', todoApi);

module.exports = router;
