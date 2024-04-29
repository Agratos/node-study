import React from 'react';
import { Col, Row } from 'react-bootstrap';

const TodoItem = ({ item, onDelete, onUpdate }) => {
	const { _id, todo, isComplete } = item;

	return (
		<Row>
			<Col xs={12}>
				<div className={`todo-item`}>
					<div className='todo-content'>{todo}</div>
					<div>
						<button className='button-delete' onClick={() => onDelete(_id)}>
							삭제
						</button>
						<button className='button-delete' onClick={() => onUpdate(_id, isComplete)}>
							끝남
						</button>
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default TodoItem;
