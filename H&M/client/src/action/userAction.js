import api from '../utils/api';
import * as types from '../constants/user.constants';
import { commonUiActions } from './commonUiAction';
import * as commonTypes from '../constants/commonUI.constants';

const loginWithToken = () => async (dispatch) => {
	try {
		dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });
		const response = await api.get('/user/me');

		dispatch({ type: types.LOGIN_WITH_TOKEN_SUCCESS, payload: response.data });
	} catch (error) {
		dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL, payload: error.error });
		dispatch(logout());
	}
};

const loginWithEmail =
	({ email, password }) =>
	async (dispatch) => {
		try {
			dispatch({ type: types.LOGIN_REQUEST });
			const response = await api.post('/auth/login', { email, password });

			sessionStorage.setItem('token', response.data.token);
			dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
		} catch (error) {
			dispatch({ type: types.LOGIN_FAIL, payload: error.error });
		}
	};

const logout = () => async (dispatch) => {
	dispatch({ type: types.LOGOUT });
	dispatch({ type: 'RESET_CART' });
	dispatch({ type: 'RESET_ORDER' });
	sessionStorage.clear();
};

const loginWithGoogle = (token) => async (dispatch) => {
	try {
		dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
		const response = await api.post('/auth/google', { token });

		sessionStorage.setItem('token', response.data.token);
		dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data });
	} catch (error) {
		dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: error.error });
	}
};

const registerUser =
	({ email, name, password }, navigate) =>
	async (dispatch) => {
		try {
			dispatch({ type: types.REGISTER_USER_REQUEST });
			await api.post('/user', { email, name, password });

			dispatch({ type: types.REGISTER_USER_SUCCESS });
			dispatch(commonUiActions.showToastMessage('회원가입을 완료 했습니다', 'success'));
			navigate('/login');
		} catch (error) {
			dispatch({ type: types.REGISTER_USER_FAIL, payload: error.error });
			dispatch(commonUiActions.showToastMessage(error.error, 'error'));
		}
	};

export const userActions = {
	loginWithToken,
	loginWithEmail,
	logout,
	loginWithGoogle,
	registerUser,
};
