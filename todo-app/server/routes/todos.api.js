const exporess = require('express');
const todoController = require('../controller/todo.controller');
const authController = require('../controller/auth.controller');
const router = exporess.Router();

// create todos
// router.post('/', (req, res) => {
// 	res.send('create todos');
// });

router.post('/', authController.authenticate, todoController.createTodo);

// get todos
// router.get('/', (req, res) => {
// 	res.send('get todos');
// });
router.get('/', todoController.getTodos);

// update todos
// router.patch('/:id', (req, res) => {
// 	res.send('update todos');
// });
router.patch('/:id', todoController.updateTodo);

// delete todos
// router.delete('/:id', (req, res) => {
// 	res.send('delete todos');
// });
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
