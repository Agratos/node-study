import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useUpdateTodoMutation } from '../hooks/apis/todo/useUpdateTodo';
import { useDeleteTodoMutation } from '../hooks/apis/todo/useDeleteTodo';

const TodoItem = ({ item }) => {
	const { _id: id, todo, isComplete } = item;
	const { mutate: deleteTodo } = useDeleteTodoMutation();
	const { mutate: updateTodo } = useUpdateTodoMutation();
	console.log(`todo: ${todo}, isComplete: ${isComplete}`);
	return (
		<Row>
			<Col xs={12}>
				<div className={`todo-item`} style={isComplete ? { background: '#dcdcdc', color: 'white' } : {}}>
					<div className='todo-content'>{todo}</div>
					<div>
						<button
							className='button-delete'
							onClick={() => {
								deleteTodo(id);
							}}
						>
							삭제
						</button>
						<button
							className='button-delete'
							onClick={() => {
								updateTodo({ id, isComplete });
							}}
						>
							끝남
						</button>
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default TodoItem;
