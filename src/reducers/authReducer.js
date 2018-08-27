import initialState from './initialState';
import {
	AUTHENTICATION_LOGIN_SUCCESS,
	AUTHENTICATION_LOGOUT_SUCCESS,
	UPDATE_USER_SUCCESS
} from '../actions/actionTypes';

export default (state = initialState.auth, action) => {
	switch (action.type) {
		case AUTHENTICATION_LOGIN_SUCCESS: {
			return {
				...state,
				isAuthenticated: action.payload.isAuthenticated,
				token: action.payload.token,
				user: action.payload.user,
				userAccess: action.payload.userAccess
			};
		}
		case AUTHENTICATION_LOGOUT_SUCCESS: {
			return {
				...state,
				isAuthenticated: action.payload.isAuthenticated,
				token: action.payload.token,
				user: action.payload.user,
				userAccess: action.payload.userAccess
			};
		}
		case UPDATE_USER_SUCCESS: {
			return {
				...state,
				user: action.payload
			};
		}
		default:
			return state;
	}
};
