import * as types from '../constants/product.constants';
const initialState = {
	loading: false,
	error: null,
	productList: [],
	totalPageNum: 1,
	selectedProduct: null,
	productDetail: null,
};

function productReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case types.GET_PRODUCT_DETAIL_REQUEST:
		case types.PRODUCT_GET_REQUEST:
		case types.PRODUCT_CREATE_REQUEST:
		case types.PRODUCT_EDIT_REQUEST:
		case types.PRODUCT_DELETE_REQUEST:
			return { ...state, loading: true, error: null };

		case types.GET_PRODUCT_DETAIL_FAIL:
		case types.PRODUCT_GET_FAIL:
		case types.PRODUCT_CREATE_FAIL:
		case types.PRODUCT_DELETE_FAIL:
			return { ...state, loading: false, error: payload };

		case types.PRODUCT_GET_SUCCESS:
			return {
				...state,
				loading: false,
				productList: payload.data,
				totalPageNum: payload.totalPageNum,
				error: null,
			};

		case types.PRODUCT_CREATE_SUCCESS:
		case types.PRODUCT_EDIT_SUCCESS:
		case types.PRODUCT_DELETE_SUCCESS:
			return { ...state, loading: false, error: null };

		case types.SET_SELECTED_PRODUCT:
			return { ...state, selectedProduct: payload, error: null };

		case types.GET_PRODUCT_DETAIL_SUCCESS:
			return { ...state, loading: false, error: null, productDetail: payload };

		default:
			return { ...state };
	}
}

export default productReducer;
