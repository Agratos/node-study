import api from '../utils/api';
import { commonUiActions } from './commonUiAction';

const getMyFavorite = () => async (dispatch) => {
	try {
		dispatch({ type: 'MY_FAVORITE_REQUEST' });
		const response = await api.get(`/favorite`);

		dispatch({ type: 'MY_FAVORITE_SUCCESS', payload: response.data.data });
	} catch (error) {
		dispatch({ type: 'MY_FAVORITE_FAIL', payload: error.error });
	}
};

const updateMyFavorite = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'UPDATE_MY_FAVORITE_REQUEST' });
		await api.put(`/favorite/${id}`);
		dispatch({ type: 'UPDATE_MY_FAVORITE_SUCCESS' });
		dispatch(getMyFavorite());
	} catch (error) {
		dispatch({ type: 'UPDATE_MY_FAVORITE_FAIL', payload: error.error });
		dispatch(commonUiActions.showToastMessage(error.error, 'error'));
	}
};

const deleteMyFavorite = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'DELETE_MY_FAVORITE_REQUEST' });
		await api.delete(`/favorite/${id}`);
		dispatch({ type: 'DELETE_MY_FAVORITE_SUCCESS' });
		dispatch(getMyFavorite());
	} catch (error) {
		dispatch({ type: 'DELETEE_MY_FAVORITE_FAIL', payload: error.error });
	}
};

export const favoritAction = {
	getMyFavorite,
	updateMyFavorite,
	deleteMyFavorite,
};
