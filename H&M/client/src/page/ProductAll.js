import React, { useEffect, useState } from 'react';
import ProductCard from '../component/ProductCard';
import { Row, Col, Container } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../action/productAction';
import { commonUiActions } from '../action/commonUiAction';
import ReactPaginate from 'react-paginate';
import LoadingSpinner from '../component/LoadingSpinner';
import PopupCard from '../component/PopupCard';
import Banner from '../component/Banner/Banner';
import { favoritAction } from '../action/favoriteAction';

const ProductAll = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [query, setQuery] = useSearchParams();
	const error = useSelector((state) => state.product.error);
	const { isFirst } = useSelector((state) => state.banner);
	const { productList, totalPageNum, loading } = useSelector((state) => state.product);
	const { myFavorite } = useSelector((state) => state.favorite);
	const { myOrder } = useSelector((state) => state.order);
	const [isPopup, setIsPopup] = useState(isFirst);
	const [searchQuery, setSearchQuery] = useState({
		pageSize: 4,
		page: query.get('page') || 1,
		name: query.get('name') || '',
	});

	useEffect(() => {
		dispatch(favoritAction.getMyFavorite());
	}, []);

	useEffect(() => {
		setIsPopup(isFirst);
	}, [isFirst]);

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
	}, [searchQuery, navigate, dispatch]);

	const handlePageClick = ({ selected }) => {
		setSearchQuery((prev) => ({ ...prev, page: selected + 1 }));
	};

	const handlePopupClose = () => {
		setIsPopup(false);
		dispatch({ type: 'SET_FIRST_MAIN', payload: false });
	};

	return (
		<Container>
			<Banner />
			<LoadingSpinner loading={loading}>
				<Row>
					{productList?.map((item, index) => (
						<Col md={3} sm={12} key={item.name + index}>
							<ProductCard
								item={item}
								favorite={myFavorite?.some((favorite) => favorite._id === item._id)}
							/>
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
			<PopupCard showPopup={isPopup} setShowPopup={handlePopupClose} />
		</Container>
	);
};

export default ProductAll;
