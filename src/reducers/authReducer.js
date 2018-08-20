import initialState from './initialState';
import {
	AUTHENTICATION_LOGIN,
	AUTHENTICATION_LOGOUT,
	UPDATE_USER
} from '../actions/actionTypes';

export default (state = initialState.auth, action) => {
	switch (action.type) {
		case AUTHENTICATION_LOGIN: {
			return {
				...state,
				token: action.payload.token,
				user: action.payload.user,
				userAccess: action.payload.userAccess
			};
		}
		case AUTHENTICATION_LOGOUT: {
			return {
				...state,
				token: action.payload.token,
				user: action.payload.user,
				userAccess: action.payload.userAccess
			};
		}
		case UPDATE_USER: {
			return {
				...state,
				user: action.payload
			};
		}
		default:
			return state;
	}
};
