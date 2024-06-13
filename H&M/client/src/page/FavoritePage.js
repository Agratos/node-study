import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { favoritAction } from '../action/favoriteAction';
import Carousel from 'react-multi-carousel';
import ProductCard from '../component/ProductCard';
import '../style/orderStatus.style.css';
import 'react-multi-carousel/lib/styles.css';

const FavoritePage = () => {
	const dispatch = useDispatch();
	const { myFavorite } = useSelector((state) => state.favorite);

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1400 },
			items: 4,
		},
		tablet: {
			breakpoint: { max: 1400, min: 464 },
			items: 1,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

	useEffect(() => {
		dispatch(favoritAction.getMyFavorite());
	}, []);

	return (
		<Container>
			{myFavorite.length !== 0 ? (
				// <Row>
				// 	{myFavorite
				// 		?.slice()
				// 		.reverse()
				// 		.map((item, index) => (
				// 			<Col md={3} sm={12} key={index}>
				// 				<ProductCard item={item} favorite={true} />
				// 			</Col>
				// 		))}
				// </Row>
				<Carousel
					itemClass='movie-slider'
					containerClass='carousel-container'
					responsive={responsive}
					infinite={true}
					//centerMode={true}
					autoPlay={true}
					autoPlaySpeed={5000}
					//showDots={true}
					//arrows={false}
					//renderButtonGroupOutside={true}
					//customButtonGroup={<ButtonGroup />}
				>
					{myFavorite.map((item) => (
						<ProductCard item={item} favorite={true} />
					))}
				</Carousel>
			) : (
				<Container className='confirmation-page'>
					<h2>찜하신 상품이 없습니다.</h2>
					<div className='text-align-center'>
						<Link to={'/'}>상품 찜하러 가기</Link>
					</div>
				</Container>
			)}
		</Container>
	);
};

export default FavoritePage;
