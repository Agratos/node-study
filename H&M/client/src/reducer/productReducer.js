import * as types from '../constants/product.constants';
const initialState = {
	loading: false,
	error: null,
};

function productReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case types.PRODUCT_CREATE_REQUEST:
			return { ...state, loading: true };
		case types.PRODUCT_CREATE_SUCCESS:
			return { ...state, loading: false };
		case types.PRODUCT_CREATE_FAIL:
			return { ...state, loading: false, error: payload.error };
		default:
			return { ...state };
	}
}

export default productReducer;