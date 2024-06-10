import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { orderActions } from '../action/orderAction';
import OrderStatusCard from '../component/OrderStatusCard';
import '../style/orderStatus.style.css';
import OrderDetailDialog from '../component/OrderDetailDialog';
import * as types from '../constants/order.constants';

const MyPage = () => {
	const dispatch = useDispatch();
	const { myOrder } = useSelector((state) => state.order);
	const [open, setOpen] = useState(false);
	//오더리스트 들고오기
	useEffect(() => {
		dispatch(orderActions.getMyOrder());
	}, []);

	const openEditForm = (order) => {
		setOpen(true);
		dispatch({ type: types.SET_SELECTED_ORDER, payload: order });
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Container className='status-card-container'>
			{myOrder.length !== 0 ? (
				myOrder?.map((order) => <OrderStatusCard order={order} setOpen={openEditForm} key={order._id} />)
			) : (
				<Container className='confirmation-page'>
					<h2>주문하신 상품이 없습니다.</h2>
					<div className='text-align-center'>
						<Link to={'/'}>상품 담으러 가기</Link>
					</div>
				</Container>
			)}
			{open && <OrderDetailDialog open={open} handleClose={handleClose} searchQuery={{}} level={'custom'} />}
		</Container>
	);
};

export default MyPage;
