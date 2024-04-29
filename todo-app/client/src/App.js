import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoBoard from './components/TodoBoard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import api from './utils/api';

function App() {
	const [todoList, setTodoList] = useState([]);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		getTodoList();
	}, []);

	const getTodoList = async () => {
		const response = await api.get('/todos');
		setTodoList(response.data.data);
	};

	const onCreate = async () => {
		const response = await api.post('/todos', {
			todo: inputValue,
			isComplete: false,
		});
		console.log('response: ', response);
		handleResponse(response);
	};

	const onDelete = async (id) => {
		const response = await api.delete(`/todos/${id}`);
		handleResponse(response);
	};

	const onUpdate = async (id, isComplete) => {
		const response = await api.patch(`/todos/${id}`, { isComplete: !isComplete });
		handleResponse(response);
	};

	const handleResponse = (response) => {
		console.log(response);
		if (response.statusText === 'ok') {
			console.log('??????');
			getTodoList();
		} else {
			console.log(response.error);
		}
	};

	return (
		<Container>
			<Row className='add-item-row'>
				<Col xs={12} sm={10}>
					<input
						type='text'
						placeholder='할일을 입력하세요'
						className='input-box'
						onChange={(e) => setInputValue(e.target.value)}
					/>
				</Col>
				<Col xs={12} sm={2}>
					<button className='button-add' onClick={onCreate}>
						추가
					</button>
				</Col>
			</Row>
			<TodoBoard todoList={todoList} getTodoList={getTodoList} onDelete={onDelete} onUpdate={onUpdate} />
		</Container>
	);
}

export default App;
