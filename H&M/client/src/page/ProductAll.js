import React, { useEffect, useState } from 'react';
import ProductCard from '../component/ProductCard';
import { Row, Col, Container } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../action/productAction';
import { commonUiActions } from '../action/commonUiAction';
import LoadingSpinner from '../component/LoadingSpinner';

const ProductAll = () => {
	const dispatch = useDispatch();
	const [query, setQuery] = useSearchParams();
	const error = useSelector((state) => state.product.error);
	const { productList, totalPageNum, loading } = useSelector((state) => state.product);
	const [searchQuery, setSearchQuery] = useState({
		page: query.get('page') || 1,
		name: query.get('name') || '',
		pageSize: 10,
	});
	// 처음 로딩하면 상품리스트 불러오기

	useEffect(() => {
		dispatch(productActions.getProductList({ ...searchQuery }));
	}, [query]);

	return (
		<Container>
			<LoadingSpinner loading={false}>
				<Row>
					{productList.map((item, index) => (
						<Col md={3} sm={12} key={item.name + index}>
							<ProductCard item={item} />
						</Col>
					))}
				</Row>
			</LoadingSpinner>
		</Container>
	);
};

export default ProductAll;
