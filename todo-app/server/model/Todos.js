const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todosSchema = Schema(
	{
		todo: {
			type: String,
			required: true,
		},
		isComplete: {
			type: Boolean,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Todo = mongoose.model('Todo', todosSchema);

module.exports = Todo;
