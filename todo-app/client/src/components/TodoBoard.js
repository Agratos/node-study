import React from 'react';
import TodoItem from './TodoItem';

const TodoBoard = ({ todoList, onDelete, onUpdate }) => {
	return (
		<div>
			<h2>Todo List</h2>
			{/* <TodoItem/> will be here once we get the todoList */}
			{todoList.length > 0 &&
				todoList.map((item, index) => (
					<TodoItem item={item} key={item._id + index} onDelete={onDelete} onUpdate={onUpdate} />
				))}
			<h2>There is no Item to show</h2>
		</div>
	);
};

export default TodoBoard;
