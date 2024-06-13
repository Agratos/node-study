import * as types from '../constants/commonUI.constants';
const initialState = {
	isLoading: false,
	error: '',
	myFavorite: [],
};

function favoriteReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case 'UPDATE_MY_FAVORITE_REQUEST':
		case 'MY_FAVORITE_REQUEST':
			return { ...state, isLoading: true };

		case 'UPDATE_MY_FAVORITE_SUCCESS':
		case 'MY_FAVORITE_SUCCESS':
			return { ...state, isLoading: false, myFavorite: payload, error: '' };

		case 'UPDATE_MY_FAVORITE_FAIL':
		case 'MY_FAVORITE_FAIL':
			return { ...state, isLoading: false, error: payload, myFavorite: [] };

		default:
			return state;
	}
}
export default favoriteReducer;
