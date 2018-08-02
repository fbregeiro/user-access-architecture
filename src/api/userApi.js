import factoryApi from './factoryApi';
import camelcaseKeysDeep from 'camelcase-keys-deep';

export const getUsersByStatus = async (isActive = null) => {
	const response = await factoryApi().get(
		`users/status/?is_active=${isActive}`
	);
	return camelcaseKeysDeep(response);
};

export const getUserById = async userId => {
	const response = await factoryApi().get(`users/${userId}`);
	return camelcaseKeysDeep(response);
};

export const createUserByInvitation = async iUser => {
	const response = await factoryApi().post('users/invitation', iUser);
	return camelcaseKeysDeep(response);
};

export const updateUser = async iUser => {
	const response = await factoryApi().put('users', iUser);
	return camelcaseKeysDeep(response);
};

export const activateUser = async iUserActivationRequest => {
	const response = await factoryApi().put(
		'users/activation',
		iUserActivationRequest
	);
	return camelcaseKeysDeep(response);
};
