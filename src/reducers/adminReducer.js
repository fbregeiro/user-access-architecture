import initialState from './initialState';
import {
	GET_USERS_BY_STATUS_SUCCESS,
	GET_PROFILES_BY_STATUS_SUCCESS,
	GET_SITEMAP_OPTIONS_SUCCESS
} from '../actions/actionTypes';

export default (state = initialState.admin, action) => {
	switch (action.type) {
		case GET_USERS_BY_STATUS_SUCCESS: {
			return {
				...state,
				users: action.payload
			};
		}
		case GET_PROFILES_BY_STATUS_SUCCESS: {
			return {
				...state,
				profiles: action.payload
			};
		}
		case GET_SITEMAP_OPTIONS_SUCCESS: {
			return {
				...state,
				sitemapOptions: action.payload
			};
		}
		default:
			return state;
	}
};
