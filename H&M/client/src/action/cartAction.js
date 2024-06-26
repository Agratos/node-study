import api from '../utils/api';
import * as types from '../constants/cart.constants';
import { commonUiActions } from '../action/commonUiAction';
const addToCart =
	({ id, size }) =>
	async (dispatch) => {
		try {
			dispatch({ type: types.ADD_TO_CART_REQUEST });
			const response = await api.post('/cart', { productId: id, size, qty: 1 });
			if (response.status !== 200) throw new Error(response.error);
			dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: response.data.cartItemQty });
			dispatch(commonUiActions.showToastMessage('카트에 상품이 추가했습니다.', 'success'));
			dispatch(getCartQty());
		} catch (error) {
			dispatch({ type: types.ADD_TO_CART_FAIL, payload: error.error });
			dispatch(commonUiActions.showToastMessage(error.error, 'error'));
		}
	};

const getCartList = () => async (dispatch) => {
	try {
		dispatch({ type: types.GET_CART_LIST_REQUEST });
		const response = await api.get('/cart');
		if (response.status !== 200) throw new Error(response.error);
		dispatch({ type: types.GET_CART_LIST_SUCCESS, payload: response.data.data });
		dispatch(getCartQty());
	} catch (error) {
		dispatch({ type: types.GET_CART_LIST_FAIL, payload: error.error });
	}
};
const deleteCartItem = (id) => async (dispatch) => {
	try {
		dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
		const response = await api.delete(`/cart/${id}`);
		if (response.status !== 200) throw new Error(response.error);
		dispatch(commonUiActions.showToastMessage('카트에 상품을 삭제했습니다.', 'success'));
		dispatch({ type: types.DELETE_CART_ITEM_SUCCESS });
		dispatch(getCartList());
	} catch (error) {
		dispatch({ type: types.DELETE_CART_ITEM_FAIL, payload: error.error });
		dispatch(commonUiActions.showToastMessage(error.error, 'error'));
	}
};

const updateQty = (id, size, value) => async (dispatch) => {
	try {
		dispatch({ type: types.UPDATE_CART_ITEM_REQUEST });
		const response = await api.put(`/cart/${id}`, { qty: value, size });
		if (response.status !== 200) throw new Error(response.error);
		dispatch({ type: types.UPDATE_CART_ITEM_SUCCESS });
		dispatch(getCartList());
	} catch (error) {
		dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: error.error });
		dispatch(commonUiActions.showToastMessage(error.error, 'error'));
	}
};
const getCartQty = () => async (dispatch) => {
	try {
		dispatch({ type: types.GET_CART_QTY_REQUEST });
		const response = await api.get(`/cart/qty`);
		if (response.status !== 200) throw new Error(response.error);
		dispatch({ type: types.GET_CART_QTY_SUCCESS, payload: response.data.data });
	} catch (error) {
		dispatch({ type: types.GET_CART_QTY_FAIL, payload: error.error });
		//dispatch(commonUiActions.showToastMessage(error.error, 'error'));
	}
}; // 몇개인지 확인 가능

export const cartActions = {
	addToCart,
	getCartList,
	deleteCartItem,
	updateQty,
	getCartQty,
};
