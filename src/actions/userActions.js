import * as api from '../api/userApi';
import { ajaxFailure, beginAjaxCall } from './ajaxStatusAction';
import {
	GET_USERS_BY_STATUS_SUCCESS,
	GET_USER_BY_ID_SUCCESS,
	CREATE_USER_BY_INVITATION_SUCCESS,
	UPDATE_USER_SUCCESS,
	ACTIVATE_USER_SUCCESS
} from '../actions/actionTypes';

export const getUsersByStatus = isActive => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		const iUsers = await api.getUsersByStatus(isActive);

		dispatch({
			type: GET_USERS_BY_STATUS_SUCCESS,
			payload: iUsers.data
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
			type: GET_USER_BY_ID_SUCCESS,
			payload: iUser.data
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
			type: CREATE_USER_BY_INVITATION_SUCCESS,
			payload: iUser.data
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};

export const updateUser = iUser => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		iUser = await api.updateUser(iUser);

		dispatch({
			type: UPDATE_USER_SUCCESS,
			payload: iUser.data
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
			type: ACTIVATE_USER_SUCCESS
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};
