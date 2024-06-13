import React from 'react';
import { useNavigate } from 'react-router-dom';
import { currencyFormat } from '../utils/number';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';
const ProductCard = ({ item, favorite }) => {
	const navigate = useNavigate();
	const showProduct = (id) => {
		// 상품 디테일 페이지로 가기
		navigate(`/product/${id}`);
	};

	return (
		<div className='card' onClick={() => showProduct(item._id)}>
			<div className='favorite-icon'>
				{favorite ? (
					<FontAwesomeIcon icon={solid.faStar} color={'green'} size={'2x'} />
				) : (
					<FontAwesomeIcon icon={solid.faStar} color={'white'} size={'2x'} />
				)}
			</div>
			<img src={item.image} alt='' />
			<div>{item.name}</div>
			<div style={{ display: 'flex' }}>
				<div className='sale-strike'>{item.price}</div>
				<div style={{ margin: '0 4px' }}>{'>'}</div>
				<div>{item.price * 0.6}</div>
			</div>
		</div>
	);
};

export default ProductCard;
