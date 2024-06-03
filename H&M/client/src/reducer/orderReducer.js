import * as types from '../constants/order.constants';

const initialState = {
	isLoading: false,
	error: '',
	orderNum: '',
	orderList: [],
};

function orderReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case types.CREATE_ORDER_REQUEST:
		case types.GET_ORDER_LIST_REQUEST:
			return { ...state, isLoading: true, error: false, orderNum: '' };

		case types.CREATE_ORDER_SUCCESS:
			return { ...state, isLoading: false, error: false, orderNum: payload };

		case types.GET_ORDER_LIST_SUCCESS:
			return { ...state, isLoading: false, error: false, orderList: payload };

		case types.GET_ORDER_LIST_FAIL:
		case types.CREATE_ORDER_FAIL:
			return { ...state, isLoading: false, error: payload, orderNum: '' };

		case 'RESET_ORDER':
			return { ...initialState };

		default:
			return state;
	}
}
export default orderReducer;
