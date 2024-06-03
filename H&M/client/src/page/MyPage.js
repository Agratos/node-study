import React from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { orderActions } from '../action/orderAction';
import OrderStatusCard from '../component/OrderStatusCard';
import '../style/orderStatus.style.css';

const MyPage = () => {
	const dispatch = useDispatch();
	const { orderList } = useSelector((state) => state.order);
	//오더리스트 들고오기
	useEffect(() => {
		dispatch(orderActions.getOrderList());
	}, []);
	// 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
	return (
		<Container className='status-card-container'>
			{orderList ? (
				orderList?.map((order) => <OrderStatusCard order={order} />)
			) : (
				<Container className='confirmation-page'>
					<h2>주문하신 상품이 없습니다.</h2>
					<div className='text-align-center'>
						<Link to={'/'}>상품 담으러 가기</Link>
					</div>
				</Container>
			)}
		</Container>
	);
};

export default MyPage;
