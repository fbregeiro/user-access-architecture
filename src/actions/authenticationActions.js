import { login, resetPassword, changePassword } from '../api/authenticationApi';
import { ajaxFailure, beginAjaxCall } from './ajaxStatusAction';
import { saveData, deleteData } from '../utils/persistency';
import config from '../config';

import {
	AUTHENTICATION_LOGIN_SUCCESS,
	AUTHENTICATION_LOGOUT_SUCCESS,
	AUTHENTICATION_RESET_PASSWORD_SUCCESS,
	AUTHENTICATION_CHANGE_PASSWORD_SUCCESS
} from '../actions/actionTypes';

export const userLogin = ({ email, password }) => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		const iLoginResponse = await login(email, password);

		if (iLoginResponse && iLoginResponse.data) {
			if (iLoginResponse.data.isSuccess) {
				// Save token into local storage
				const { api } = config;
				saveData(api.tokenKey, iLoginResponse.data.token);

				// Save user data.
				const userData = {
					isAuthenticated: true,
					token: iLoginResponse.data.token,
					user: iLoginResponse.data.user,
					userAccess: iLoginResponse.data.userAccess
				};

				dispatch({
					payload: userData,
					type: AUTHENTICATION_LOGIN_SUCCESS
				});
			} else {
				throw iLoginResponse.operationMessage;
			}
		} else {
			throw 'Erro inesperado';
		}
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};

export const userLogout = () => async dispatch => {
	const { api } = config;
	deleteData(api.tokenKey);

	const userData = {
		isAuthenticated: false,
		token: null,
		user: null,
		userAccess: null
	};
	dispatch({
		payload: userData,
		type: AUTHENTICATION_LOGOUT_SUCCESS
	});
};

export const resetUserPassword = email => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		await resetPassword(email);
		dispatch({
			type: AUTHENTICATION_RESET_PASSWORD_SUCCESS
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};

export const changeUserPassword = iChangePasswordRequest => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		await changePassword(iChangePasswordRequest);
		dispatch({
			type: AUTHENTICATION_CHANGE_PASSWORD_SUCCESS
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};
