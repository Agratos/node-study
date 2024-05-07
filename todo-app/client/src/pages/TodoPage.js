import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoBoard from '../components/TodoBoard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { useCreateTodoMutation } from '../hooks/apis/todo/useCreateTodo';
import { useGetTodosQuery } from '../hooks/apis/todo/useGetTodos';

const TodoPage = () => {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');
	const { data } = useGetTodosQuery();
	const { mutate: createTodo } = useCreateTodoMutation();

	const handleCreateTodo = () => {
		if (inputValue) createTodo({ todo: inputValue, isComplete: false });
		setInputValue('');
	};

	const handleLogout = () => {
		sessionStorage.removeItem('token');
		navigate('/login');
	};

	return (
		<Container>
			<Row className='add-item-row'>
				<Col xs={12} sm={8}>
					<input
						type='text'
						placeholder='할일을 입력하세요'
						className='input-box'
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
				</Col>
				<Col xs={12} sm={2}>
					<button className='button-add' onClick={handleCreateTodo}>
						추가
					</button>
				</Col>
				<Col xs={12} sm={2}>
					<button className='button-add' onClick={handleLogout}>
						로그아웃
					</button>
				</Col>
			</Row>
			<TodoBoard todoList={data} />
		</Container>
	);
};

export default TodoPage;
