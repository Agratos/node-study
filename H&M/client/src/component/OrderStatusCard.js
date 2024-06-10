import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { badgeBg } from '../constants/order.constants';
import { currencyFormat } from '../utils/number';

const OrderStatusCard = ({ order, setOpen }) => {
	return (
		<div>
			<Row className='status-card' onClick={() => setOpen(order)}>
				<Col xs={2}>
					<img src={order?.items[0].productId.image} alt='' height={96} />
				</Col>
				<Col xs={8} className='order-info'>
					<div>
						<strong>주문번호: {order?.orderNum}</strong>
					</div>

					<div className='text-12'>{order?.createdAt.replace('T', ' ').split('.')[0]}</div>

					<div>
						{order?.items[0].productId.name}외 {order?.items.length}개
					</div>
					<div>₩ {currencyFormat(order?.totalPrice * 0.6)}</div>
				</Col>
				<Col md={2} className='vertical-middle'>
					<div className='text-align-center text-12'>주문상태</div>
					<Badge bg={badgeBg[order?.status]}>{order?.status}</Badge>
				</Col>
			</Row>
		</div>
	);
};

export default OrderStatusCard;
