import * as api from '../api/userApi';
import { ajaxFailure, beginAjaxCall } from './ajaxStatusAction';
import {
	GET_USERS_BY_STATUS,
	GET_USER_BY_ID,
	CREATE_USER_BY_INVITATION,
	UPDATE_USER,
	ACTIVATE_USER
} from '../actions/actionTypes';

export const getUsersByStatus = isActive => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		const iUsers = await api.getUsersByStatus(isActive);

		dispatch({
			type: GET_USERS_BY_STATUS,
			payload: iUsers
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};

export const getUserById = userId => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		const iUser = await api.getUserById(userId);

		dispatch({
			type: GET_USER_BY_ID,
			payload: iUser
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};

export const createUserByInvitation = iUser => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		iUser = await api.createUserByInvitation(iUser);

		dispatch({
			type: CREATE_USER_BY_INVITATION,
			payload: iUser
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};

export const updateUserByInvitation = iUser => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		iUser = await api.updateUser(iUser);

		dispatch({
			type: UPDATE_USER,
			payload: iUser
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};

export const activateUser = iUserActivationRequest => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		await api.activateUser(iUserActivationRequest);

		dispatch({
			type: ACTIVATE_USER
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};
