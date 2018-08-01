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
