import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { currencyFormat } from '../utils/number';

const OrderReceipt = ({ cartList, totalPrice }) => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className='receipt-container'>
			<h3 className='receipt-title'>주문 내역</h3>
			<ul className='receipt-list'>
				{cartList.map((item) => (
					<li key={item._id}>
						<div className='display-flex space-between'>
							<div>{item.productId.name}</div>
							<div>
								₩{' '}
								<label className='sale-strike'>{currencyFormat(item.productId.price * item.qty)}</label>
							</div>
						</div>
						<div className='display-flex space-between'>
							<div></div>₩ {currencyFormat(item.productId.price * item.qty * 0.6)}
						</div>
					</li>
				))}
			</ul>
			<div className='display-flex space-between receipt-title'>
				<div>
					<strong>Total:</strong>
				</div>
				<div>
					<strong>
						₩{' '}
						{cartList.length !== 0 ? (
							<label className='sale-strike'>{currencyFormat(totalPrice)}</label>
						) : (
							0
						)}
					</strong>
				</div>
			</div>
			<div className='display-flex space-between receipt-title'>
				<div></div>
				<div>
					<strong>₩ {currencyFormat(totalPrice * 0.6)}</strong>
				</div>
			</div>
			{location.pathname.includes('/cart') && (
				<Button
					variant='dark'
					className='payment-button'
					onClick={() => navigate('/payment')}
					disabled={cartList.length === 0}
				>
					결제 계속하기
				</Button>
			)}
			<div>
				가능한 결제 수단 귀하가 결제 단계에 도달할 때까지 가격 및 배송료는 확인되지 않습니다.
				<div>30일의 반품 가능 기간, 반품 수수료 및 미수취시 발생하는 추가 배송 요금 읽어보기 반품 및 환불</div>
			</div>
		</div>
	);
};

export default OrderReceipt;
