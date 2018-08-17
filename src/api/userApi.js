import { ApiFactory } from './factoryApi';
import camelcaseKeysDeep from 'camelcase-keys-deep';

const instance = ApiFactory();

export const getUsersByStatus = async (isActive = null) => {
	const response = await instance.get(
		`/api/users/status/?is_active=${isActive}`
	);
	return camelcaseKeysDeep(response);
};

export const getUserById = async userId => {
	const response = await instance.get(`/api/users/${userId}`);
	return camelcaseKeysDeep(response);
};

export const createUserByInvitation = async iUser => {
	const response = await instance.post('/api/users/invitation', iUser);
	return camelcaseKeysDeep(response);
};

export const updateUser = async iUser => {
	const response = await instance.put('/api/users', iUser);
	return camelcaseKeysDeep(response);
};

export const activateUser = async iUserActivationRequest => {
	const response = await instance.put(
		'/api/users/activation',
		iUserActivationRequest
	);
	return camelcaseKeysDeep(response);
};
