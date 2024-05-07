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
		},
		author: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const Todo = mongoose.model('Todo', todosSchema);

module.exports = Todo;
