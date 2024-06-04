import api from '../utils/api';
import * as types from '../constants/order.constants';
import { cartActions } from './cartAction';
import { commonUiActions } from './commonUiAction';

const createOrder = (payload, navigate) => async (dispatch) => {
	try {
		dispatch({ type: types.CREATE_ORDER_REQUEST });
		const response = await api.post('/order', payload);
		dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: response.data.orderNum });
		dispatch(cartActions.getCartQty());
		navigate('/payment/success');
	} catch (error) {
		dispatch({ type: types.CREATE_ORDER_FAIL, payload: error.error });
		dispatch(commonUiActions.showToastMessage(error.error, 'error'));
	}
};

const getMyOrder = () => async (dispatch) => {
	try {
		dispatch({ type: types.GET_ORDER_REQUEST });
		const response = await api.get(`/order/myOrder`);

		dispatch({ type: types.GET_ORDER_SUCCESS, payload: response.data.orderList });
	} catch (error) {
		dispatch({ type: types.GET_ORDER_FAIL, payload: error.error });
		dispatch(commonUiActions.showToastMessage(error.error, 'error'));
	}
};

const getOrderList = (query) => async (dispatch) => {
	try {
		dispatch({ type: types.GET_ORDER_LIST_REQUEST });
		const response = await api.get(`/order/orderList`, {
			params: { ...query },
		});

		dispatch({ type: types.GET_ORDER_LIST_SUCCESS, payload: response.data });
	} catch (error) {
		dispatch({ type: types.GET_ORDER_LIST_FAIL, payload: error.error });
		dispatch(commonUiActions.showToastMessage(error.error, 'error'));
	}
};

const updateOrder =
	({ id, status, pageSize, page, name, level }) =>
	async (dispatch) => {
		try {
			dispatch({ type: types.UPDATE_ORDER_REQUEST });
			await api.put(`/order/${id}`, { status });
			console.log(level);
			dispatch({ type: types.UPDATE_ORDER_SUCCESS });
			if (level === 'admin') {
				dispatch(commonUiActions.showToastMessage('주문 변경 완료', 'success'));
				dispatch(getOrderList({ pageSize, page, name }));
			} else {
				dispatch(commonUiActions.showToastMessage('주문 취소 완료', 'success'));
				dispatch(getMyOrder());
			}
		} catch (error) {
			dispatch({ type: types.UPDATE_ORDER_FAIL, payload: error.error });
			dispatch(commonUiActions.showToastMessage(error.error, 'error'));
		}
	};

export const orderActions = {
	createOrder,
	getMyOrder,
	getOrderList,
	updateOrder,
};
