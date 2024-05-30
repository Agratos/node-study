import React, { useEffect, useState } from 'react';
import ProductCard from '../component/ProductCard';
import { Row, Col, Container } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../action/productAction';
import { commonUiActions } from '../action/commonUiAction';
import ReactPaginate from 'react-paginate';
import LoadingSpinner from '../component/LoadingSpinner';

const ProductAll = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [query, setQuery] = useSearchParams();
	const error = useSelector((state) => state.product.error);
	const { productList, totalPageNum, loading } = useSelector((state) => state.product);
	const [searchQuery, setSearchQuery] = useState({
		pageSize: 4,
		page: query.get('page') || 1,
		name: query.get('name') || '',
	});

	useEffect(() => {
		setSearchQuery((prev) => ({
			...prev,
			page: query.get('page') || 1,
			name: query.get('name') || '',
		}));
	}, [query]);

	useEffect(() => {
		const isValid = /\S/.test(searchQuery.name);
		if (!isValid) delete searchQuery.name;

		const params = new URLSearchParams(searchQuery);
		const queryString = params.toString();

		// Query string이 변경될 때만 navigate 호출
		if (queryString !== query.toString()) {
			navigate(`?${queryString}`);
		}

		dispatch(productActions.getProductList({ ...searchQuery }));
	}, [query, searchQuery, navigate, dispatch]);

	const handlePageClick = ({ selected }) => {
		setSearchQuery((prev) => ({ ...prev, page: selected + 1 }));
	};

	return (
		<Container>
			<LoadingSpinner loading={loading}>
				<Row>
					{productList?.map((item, index) => (
						<Col md={3} sm={12} key={item.name + index}>
							<ProductCard item={item} />
						</Col>
					))}
				</Row>
			</LoadingSpinner>
			{searchQuery.pageSize <= totalPageNum * searchQuery.pageSize && (
				<ReactPaginate
					nextLabel='next >'
					onPageChange={handlePageClick}
					pageRangeDisplayed={searchQuery.pageSize}
					pageCount={totalPageNum}
					forcePage={searchQuery.page - 1} // 현재 페이지 반영
					previousLabel='< previous'
					renderOnZeroPageCount={null}
					pageClassName='page-item'
					pageLinkClassName='page-link'
					previousClassName='page-item'
					previousLinkClassName='page-link'
					nextClassName='page-item'
					nextLinkClassName='page-link'
					breakClassName='page-item'
					breakLinkClassName='page-link'
					containerClassName='pagination display-center list-style-none'
					activeClassName='active'
				/>
			)}
		</Container>
	);
};

export default ProductAll;
