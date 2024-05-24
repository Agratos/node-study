import * as types from '../constants/product.constants';
const initialState = {
	loading: false,
	error: null,
	productList: [],
};

function productReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case types.PRODUCT_GET_REQUEST:
		case types.PRODUCT_CREATE_REQUEST:
			return { ...state, loading: true };
		case types.PRODUCT_GET_FAIL:
		case types.PRODUCT_CREATE_FAIL:
			return { ...state, loading: false, error: payload };
		case types.PRODUCT_CREATE_SUCCESS:
			return { ...state, loading: false };
		case types.PRODUCT_GET_SUCCESS:
			return { ...state, loading: false, productList: payload };
		default:
			return { ...state };
	}
}

export default productReducer;
