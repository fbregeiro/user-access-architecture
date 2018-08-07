import { login, resetPassword, changePassword } from '../api/authenticationApi';
import { ajaxFailure, beginAjaxCall } from './ajaxStatusAction';
import { saveData, deleteData } from '../utils/persistency';

import {
	AUTHENTICATION_LOGIN,
	AUTHENTICATION_LOGOUT,
	AUTHENTICATION_RESET_PASSWORD,
	AUTHENTICATION_CHANGE_PASSWORD
} from '../actions/actionTypes';

// import { SubmissionError } from 'redux-form'; // TODO: Check when to use SubmissionError instead of throw Error

export const AUTHENTICATION_DATA = 'authentication_data';

export const userLogin = ({ email, password }) => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		const iLoginResponse = await login(email, password);

		if (iLoginResponse && iLoginResponse.data) {
			if (iLoginResponse.data.isSuccess) {
				const authenticationData = {
					userId: iLoginResponse.data.user.id,
					email: iLoginResponse.data.user.email,
					fullName: iLoginResponse.data.user.fullName,
					token: iLoginResponse.data.token,
					user_access: iLoginResponse.data.userAccess
				};

				saveData(AUTHENTICATION_DATA, authenticationData);

				dispatch({
					...authenticationData,
					type: AUTHENTICATION_LOGIN
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
		// throw new SubmissionError({
		// 	_error: error
		// });
	}
};

export const userLogout = () => async dispatch => {
	deleteData(AUTHENTICATION_DATA);
	dispatch({
		type: AUTHENTICATION_LOGOUT
	});
};

export const resetUserPassword = email => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		await resetPassword(email);
		dispatch({
			type: AUTHENTICATION_RESET_PASSWORD
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
			type: AUTHENTICATION_CHANGE_PASSWORD
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};
