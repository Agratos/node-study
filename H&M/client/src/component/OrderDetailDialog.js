import React, { useState } from 'react';
import { Form, Modal, Button, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import '../style/adminOrder.style.css';
import { ORDER_STATUS } from '../constants/order.constants';
import { orderActions } from '../action/orderAction';
import { currencyFormat } from '../utils/number';

const OrderDetailDialog = ({ open, handleClose, searchQuery, level }) => {
	const selectedOrder = useSelector((state) => state.order.selectedOrder);
	const [orderStatus, setOrderStatus] = useState(selectedOrder.status);
	const dispatch = useDispatch();

	const handleStatusChange = (event) => {
		setOrderStatus(event.target.value);
	};
	const submitStatus = (e) => {
		e.preventDefault();
		const tempOrderStatus = level === 'admin' ? orderStatus : ORDER_STATUS[3];

		dispatch(orderActions.updateOrder({ id: selectedOrder._id, status: tempOrderStatus, ...searchQuery, level }));

		handleClose();
	};

	if (!selectedOrder) {
		return <></>;
	}
	console.log(selectedOrder);
	return (
		<Modal show={open} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Order Detail</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>예약번호: {selectedOrder.orderNum}</p>
				<p>주문날짜: {selectedOrder.createdAt.replace('T', ' ').slice(0, -5)}</p>
				<p>이메일: {selectedOrder.userId.email}</p>
				<p>주소:{selectedOrder.shipTo.address + ' ' + selectedOrder.shipTo.city}</p>
				<p>
					연락처:
					{`${selectedOrder.contact.firstName + selectedOrder.contact.lastName} ${
						selectedOrder.contact.contact
					}`}
				</p>
				<p>주문내역</p>
				<div className='overflow-x'>
					<Table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Unit Price</th>
								<th>Qty</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody>
							{selectedOrder.items.length > 0 &&
								selectedOrder.items.map((item) => (
									<tr key={item._id}>
										<td>{item._id}</td>
										<td>{item.productId.name}</td>
										<td>{currencyFormat(item.price * 0.6)}</td>
										<td>{item.qty}</td>
										<td>{currencyFormat(item.price * item.qty * 0.6)}</td>
									</tr>
								))}
							<tr>
								<td colSpan={4}>총계:</td>
								<td>{currencyFormat(selectedOrder.totalPrice * 0.6)}</td>
							</tr>
						</tbody>
					</Table>
				</div>
				<Form onSubmit={submitStatus}>
					<Form.Group as={Col} controlId='status'>
						<Form.Label>Status</Form.Label>
						<Form.Select value={orderStatus} onChange={handleStatusChange} disabled={level === 'custom'}>
							{ORDER_STATUS.map((item, idx) => (
								<option key={idx} value={item.toLowerCase()}>
									{item}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					{level === 'custom' && !['preparing', 'refund'].includes(orderStatus) && (
						<div style={{ textAlign: 'center', color: 'red', fontSize: '14px', marginTop: '16px' }}>
							{orderStatus === 'shipping' ? '상품이 배송중입니다. ' : '상품이 배송완료되었습니다. '}
							환불은 관리자에게 문의하세요
						</div>
					)}
					{orderStatus === 'refund' && (
						<div style={{ textAlign: 'center', color: 'red', fontSize: '14px', marginTop: '16px' }}>
							환불처리 완료: {selectedOrder.updatedAt}
						</div>
					)}
					<div className='order-button-area'>
						<Button variant='light' onClick={handleClose} className='order-button'>
							닫기
						</Button>
						{level === 'admin' ? (
							<Button type='submit'>저장</Button>
						) : (
							orderStatus === 'preparing' && <Button type='submit'>환불</Button>
						)}
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default OrderDetailDialog;
