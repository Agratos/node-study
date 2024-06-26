import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import SearchBox from '../component/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../action/productAction';
import NewItemDialog from '../component/NewItemDialog';
import * as types from '../constants/product.constants';
import ReactPaginate from 'react-paginate';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { commonUiActions } from '../action/commonUiAction';
import ProductTable from '../component/ProductTable';
import LoadingSpinner from '../component/LoadingSpinner';
import DeleteDialog from '../component/DeleteDialog';

const AdminProduct = () => {
	const navigate = useNavigate();
	const [query, setQuery] = useSearchParams();
	const dispatch = useDispatch();
	const { productList, totalPageNum, loading } = useSelector((state) => state.product);
	const [showDialog, setShowDialog] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const [searchQuery, setSearchQuery] = useState({
		pageSize: 5,
		page: query.get('page') || 1,
		name: query.get('name') || '',
	}); //검색 조건들을 저장하는 객체

	const [mode, setMode] = useState('new');
	const tableHeader = ['#', 'Sku', 'Name', 'Price', 'Stock', 'Image', 'Status', ''];

	//상품리스트 가져오기 (url쿼리 맞춰서)
	useEffect(() => {
		dispatch(productActions.getProductList({ ...searchQuery }));
	}, [query]);

	useEffect(() => {
		//검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
		const isValid = /\S/.test(searchQuery.name);

		if (!isValid) delete searchQuery.name;

		// object를 query 형태로
		const params = new URLSearchParams(searchQuery);
		const query = params.toString();

		navigate(`?` + query);
	}, [searchQuery]);

	const deleteItem = (id, sku) => {
		//아이템 삭제하기
		setDeleteId({id, sku});
		setDeleteDialog(true);
		//dispatch(productActions.deleteProduct(id, { ...searchQuery }));
	};

	const deleteStock = () => {
		dispatch(productActions.deleteProduct(deleteId?.id, { ...searchQuery }))
		setDeleteDialog(false);
	}

	const openEditForm = (product) => {
		//edit모드로 설정하고
		// 아이템 수정다이얼로그 열어주기
		setMode('edit');
		dispatch({ type: types.SET_SELECTED_PRODUCT, payload: product });
		setShowDialog(true);
	};

	const handleClickNewItem = () => {
		//new 모드로 설정하고
		// 다이얼로그 열어주기
		setMode('new');
		setShowDialog(true);
	};

	const handlePageClick = ({ selected }) => {
		//  쿼리에 페이지값 바꿔주기
		setSearchQuery({ ...searchQuery, page: selected + 1 });
	};

	return (
		<div className='locate-center'>
			<Container>
				<div className='mt-2'>
					<SearchBox
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						placeholder='제품 이름으로 검색'
						field='name'
					/>
				</div>
				<Button className='mt-2 mb-2' onClick={handleClickNewItem}>
					Add New Item +
				</Button>

				<LoadingSpinner loading={loading}>
					<ProductTable
						header={tableHeader}
						data={productList}
						deleteItem={deleteItem}
						openEditForm={openEditForm}
					/>
				</LoadingSpinner>

				<ReactPaginate
					nextLabel='next >'
					onPageChange={handlePageClick}
					pageRangeDisplayed={searchQuery.pageSize}
					pageCount={totalPageNum}
					forcePage={0} // 1페이지면 2임 여긴 한개씩 +1 해야함
					previousLabel='< previous'
					renderOnZeroPageCount={null}
					pageClassName='page-item'
					pageLinkClassName='page-link'
					previousClassName='page-item'
					previousLinkClassName='page-link'
					nextClassName='page-item'
					nextLinkClassName='page-link'
					//breakLabel='...'
					breakClassName='page-item'
					breakLinkClassName='page-link'
					containerClassName='pagination display-center list-style-none'
					activeClassName='active'
				/>
			</Container>

			<NewItemDialog
				mode={mode}
				showDialog={showDialog}
				setShowDialog={setShowDialog}
				searchQuery={searchQuery}
			/>
			<DeleteDialog 
				sku={deleteId?.sku}
				showDialog={deleteDialog}
				setShowDialog={setDeleteDialog}
				deleteStock={deleteStock}
			/>
		</div>
	);
};

export default AdminProduct;
