import * as types from '../constants/cart.constants';
import { LOGIN_SUCCESS, GOOGLE_LOGIN_SUCCESS, LOGOUT } from '../constants/user.constants';

const initialState = {
	loading: false,
	error: '',
	cartList: [],
	totalPrice: 0,
	cartItemQty: 0,
	cartItemCount: 0,
};

function cartReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case types.GET_CART_QTY_REQUEST:
		case types.UPDATE_CART_ITEM_REQUEST:
		case types.GET_CART_LIST_REQUEST:
		case types.ADD_TO_CART_REQUEST:
			return { ...state, loading: true };

		case types.UPDATE_CART_ITEM_SUCCESS:
			return { ...state, loading: false, error: '' };

		case types.ADD_TO_CART_SUCCESS:
			return { ...state, cartItemQty: payload, loading: false, error: '' };

		case types.GET_CART_LIST_SUCCESS:
			return {
				...state,
				cartList: payload,
				totalPrice: payload.reduce((total, item) => (total += item.productId.price * item.qty), 0),
				loading: false,
				error: '',
			};

		case types.GET_CART_QTY_SUCCESS:
			return { ...state, cartItemCount: payload, loading: false, error: '' };

		case types.GET_CART_QTY_FAIL:
		case types.UPDATE_CART_ITEM_FAIL:
		case types.GET_CART_LIST_FAIL:
		case types.ADD_TO_CART_FAIL:
			return { ...state, loading: false, error: payload };

		case 'RESET_CART':
			return { ...initialState };

		default:
			return { ...state };
	}
}
export default cartReducer;
