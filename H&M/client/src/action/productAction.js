import api from '../utils/api';
import * as types from '../constants/product.constants';
import { toast } from 'react-toastify';
import { commonUiActions } from './commonUiAction';

const getProductList = (query) => async (dispatch) => {
	try {
		dispatch({ type: types.PRODUCT_GET_REQUEST });
		const response = await api.get('/product', {
			params: { ...query },
		});
		if (response.status !== 200) throw new Error(response.error);
		dispatch({ type: types.PRODUCT_GET_SUCCESS, payload: response.data });
	} catch (error) {
		dispatch({ type: types.PRODUCT_GET_FAIL, payload: error });
	}
};
const getProductDetail = (id) => async (dispatch) => {
	try {
		dispatch({ type: types.GET_PRODUCT_DETAIL_REQUEST });
		const response = await api.get(`/product/${id}`);
		if (response.status !== 200) throw new Error(response.error);
		dispatch({ type: types.GET_PRODUCT_DETAIL_SUCCESS, payload: response.data.product });
	} catch (error) {
		dispatch({ type: types.GET_PRODUCT_DETAIL_FAIL, payload: error.error });
		dispatch(commonUiActions.showToastMessage(error.error, 'error'));
	}
};

const createProduct = (formData, pageSize, page, name) => async (dispatch) => {
	try {
		dispatch({ type: types.PRODUCT_CREATE_REQUEST });
		const response = await api.post('/product/create', formData);
		if (response.status !== 200) throw new Error(response.error);
		dispatch({ type: types.PRODUCT_CREATE_SUCCESS, payload: response.data });
		dispatch(getProductList({ pageSize, page, name }));
		dispatch(commonUiActions.showToastMessage('상품 생성 완료', 'success'));
	} catch (error) {
		dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: error.error });
		dispatch(commonUiActions.showToastMessage(error.error, 'error'));
	}
};
const deleteProduct = (id, pageSize, page, name) => async (dispatch) => {
	try {
		dispatch({ type: types.PRODUCT_DELETE_REQUEST });
		const response = await api.delete(`/product/${id}`);
		if (response.status !== 200) throw new Error(response.error);
		dispatch({ type: types.PRODUCT_DELETE_SUCCESS, payload: response.data });
		dispatch(getProductList({ pageSize, page, name }));
		dispatch(commonUiActions.showToastMessage('상품 삭제 완료', 'success'));
	} catch (error) {
		dispatch({ type: types.PRODUCT_DELETE_FAIL, payload: error.error });
		dispatch(commonUiActions.showToastMessage(error.error, 'error'));
	}
};

const editProduct = (formData, id, pageSize, page, name) => async (dispatch) => {
	try {
		dispatch({ type: types.PRODUCT_EDIT_REQUEST });
		const response = await api.put(`/product/${id}`, formData);
		if (response.status !== 200) throw new Error(response.error);
		dispatch({ type: types.PRODUCT_EDIT_SUCCESS, payload: response.data });
		dispatch(getProductList({ pageSize, page, name }));
		dispatch(commonUiActions.showToastMessage('상품 수정 완료', 'success'));
	} catch (error) {
		dispatch({ type: types.PRODUCT_EDIT_FAIL, payload: error.error });
		dispatch(commonUiActions.showToastMessage(error.error, 'error'));
	}
};

export const productActions = {
	getProductList,
	createProduct,
	deleteProduct,
	editProduct,
	getProductDetail,
};
