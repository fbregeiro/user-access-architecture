import initialState from './initialState';
import {
	GET_USERS_BY_STATUS,
	GET_PROFILES_BY_STATUS
} from '../actions/actionTypes';

export default (state = initialState.admin, action) => {
	switch (action.type) {
		case GET_USERS_BY_STATUS: {
			return {
				...state,
				users: action.payload
			};
		}
		case GET_PROFILES_BY_STATUS: {
			return {
				...state,
				profiles: action.payload
			};
		}
		default:
			return state;
	}
};
