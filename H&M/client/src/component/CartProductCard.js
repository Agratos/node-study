import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { cartActions } from '../action/cartAction';
import { currencyFormat } from '../utils/number';

const CartProductCard = ({ item }) => {
	const dispatch = useDispatch();

	const handleQtyChange = (id, size, qty) => {
		//아이템 수량을 수정한다
		dispatch(cartActions.updateQty(id, size, qty));
	};

	const deleteCart = (id) => {
		//아이템을 지운다
		dispatch(cartActions.deleteCartItem(id));
	};

	return (
		<div className='product-card-cart'>
			<Row>
				<Col md={2} xs={12}>
					<img src={item.productId.image} width={112} />
				</Col>
				<Col md={10} xs={12}>
					<div className='display-flex space-between'>
						<h3>{item.productId.name}</h3>
						<button className='trash-button'>
							<FontAwesomeIcon icon={faTrash} width={24} onClick={() => deleteCart(item._id)} />
						</button>
					</div>

					<div>
						<strong>₩ {currencyFormat(item.productId.price)}</strong>
					</div>
					<div>Size: {item.size.toUpperCase()}</div>
					<div style={{ display: 'flex' }}>
						Total: ₩{' '}
						<div className='sale-strike' style={{ marginRight: '4px' }}>
							{currencyFormat(item.productId.price * item.qty)}
						</div>
						{'>'}
						<div style={{ marginLeft: '4px' }}>{currencyFormat(item.productId.price * item.qty * 0.6)}</div>
					</div>
					<div>
						Quantity:
						<Form.Select
							onChange={(event) => handleQtyChange(item.productId._id, item.size, event.target.value)}
							required
							defaultValue={item.qty}
							className='qty-dropdown'
						>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
							<option value={5}>5</option>
							<option value={6}>6</option>
							<option value={7}>7</option>
							<option value={8}>8</option>
							<option value={9}>9</option>
							<option value={10}>10</option>
						</Form.Select>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default CartProductCard;
