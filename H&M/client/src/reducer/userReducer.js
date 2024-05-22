import * as types from '../constants/user.constants';
const initialState = {
	loading: true,
	user: null,
	loginError: '',
	registerError: '',
};

function userReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case types.LOGIN_WITH_TOKEN_REQUEST:
		case types.REGISTER_USER_REQUEST:
		case types.LOGIN_REQUEST:
			return { ...state, loading: true };

		case types.LOGIN_WITH_TOKEN_SUCCESS:
		case types.LOGIN_SUCCESS:
			return { ...state, loading: false, user: payload.user };

		case types.LOGIN_FAIL:
			console.log(`payload`, payload);
			return { ...state, loading: false, loginError: payload };

		case types.REGISTER_USER_FAIL:
			return { ...state, loading: false, registerError: payload };

		case types.LOGIN_WITH_TOKEN_FAIL:
			return { ...state, loading: false };

		case types.ERROR_RESET:
			return { ...initialState, user: state.user };

		default:
			return { ...state };
	}
}

export default userReducer;
