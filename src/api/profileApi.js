import { ApiFactory } from './factoryApi';
import camelcaseKeysDeep from 'camelcase-keys-deep';

const instance = ApiFactory();

export const getProfilesByStatus = async (isActive = null) => {
	const response = await instance.get(
		`/api/profiles/status/?is_active=${isActive}`
	);
	return camelcaseKeysDeep(response);
};

export const getProfileById = async profileId => {
	const response = await instance.get(`/api/profiles/${profileId}`);
	return camelcaseKeysDeep(response);
};

export const createProfile = async iProfileRequest => {
	const response = await instance.post('/api/profiles', iProfileRequest);
	return camelcaseKeysDeep(response);
};

export const updateProfile = async iProfileRequest => {
	const response = await instance.put('/api/profiles', iProfileRequest);
	return camelcaseKeysDeep(response);
};
