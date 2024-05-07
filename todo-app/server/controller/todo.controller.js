const Todo = require('../model/Todos');

const todoController = {};

const successResponse = (res, data) => {
	res.status(200).json({
		status: 'success',
		data,
	});
};

const failResponse = (res, error) => {
	res.status(400).json({
		status: 'fail',
		error,
	});
};

todoController.createTodo = async (req, res) => {
	try {
		const { todo, isComplete } = req.body;
		const { userId } = req;
		const newTodo = new Todo({ todo, isComplete, author: userId });

		await newTodo.save();

		res.status(200).json({
			status: 'ok',
			data: newTodo,
		});
	} catch (error) {
		failResponse(res, error);
	}
};

todoController.getTodos = async (req, res) => {
	try {
		const todoList = await Todo.find({}).populate('author');

		successResponse(res, todoList);
	} catch (error) {
		failResponse(res, error);
	}
};

todoController.updateTodo = async (req, res) => {
	try {
		const _id = req.params.id;
		const { isComplete } = req.body;
		const todo = await Todo.findOne({ _id });
		todo.isComplete = isComplete;

		await todo.save();

		successResponse(res, todo);
	} catch (error) {
		failResponse(res, error);
	}
};

todoController.deleteTodo = async (req, res) => {
	try {
		const _id = req.params.id;
		await Todo.deleteOne({ _id });
		successResponse(res);
	} catch (error) {
		failResponse(res, error);
	}
};

module.exports = todoController;
