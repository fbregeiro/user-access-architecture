import factoryApi from './factoryApi';
import camelcaseKeysDeep from 'camelcase-keys-deep';

export const login = async (email, password) => {
	const iLoginRequest = {
		email: email,
		password: password
	};

	const response = await factoryApi().post(
		'authentication/login',
		iLoginRequest
	);
	return camelcaseKeysDeep(response);
};

export const resetPassword = async email => {
	const iPasswordResetRequest = { email: email };
	factoryApi().post('authentication/reset-password', iPasswordResetRequest);
};

export const changePassword = async iChangePasswordRequest => {
	factoryApi().put('authentication/new-password', iChangePasswordRequest);
};
