import { login } from '../api/authenticationApi';
import { ajaxFailure, beginAjaxCall } from './ajaxStatusAction';
// import { SubmissionError } from 'redux-form'; // TODO: Check when to use SubmissionError instead of throw Error
// import history from '../store/history'; // TODO: Analyze when it's better to call history.push

import {
	AUTHENTICATION_LOGIN,
	AUTHENTICATION_LOGOUT
} from '../actions/actionTypes';
import { saveData, deleteData } from '../utils/persistency';

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
					token: iLoginResponse.data.token
				};
				saveData(AUTHENTICATION_DATA, authenticationData);

				dispatch({
					...authenticationData,
					type: AUTHENTICATION_LOGIN
				});

				// history.push('/');
			} else {
				throw iLoginResponse.operationMessage;
			}
		} else {
			throw 'Erro inesperado';
		}
	} catch (errorMessage) {
		dispatch(ajaxFailure(errorMessage));
		throw errorMessage;
		// throw new SubmissionError({
		// 	_error: errorMessage
		// });
	}
};

export const userLogout = () => {
	deleteData(AUTHENTICATION_DATA);

	return {
		type: AUTHENTICATION_LOGOUT
	};
};
