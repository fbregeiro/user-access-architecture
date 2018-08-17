import { ApiFactory } from './factoryApi';
import camelcaseKeysDeep from 'camelcase-keys-deep';

const instance = ApiFactory();

export const login = async (email, password) => {
	const iLoginRequest = {
		email: email,
		password: password
	};

	const response = await instance.post(
		'/api/authentication/login',
		iLoginRequest
	);
	return camelcaseKeysDeep(response);
};

export const resetPassword = async email => {
	const iPasswordResetRequest = { email: email };
	await instance.post(
		'/api/authentication/reset-password',
		iPasswordResetRequest
	);
};

export const changePassword = async iChangePasswordRequest => {
	await instance.put(
		'/api/authentication/new-password',
		iChangePasswordRequest
	);
};
