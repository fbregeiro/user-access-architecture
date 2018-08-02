import factoryApi from './factoryApi';
import camelcaseKeysDeep from 'camelcase-keys-deep';

export const getProfilesByStatus = async (isActive = null) => {
	const response = await factoryApi().get(
		`profiles/status/?is_active=${isActive}`
	);
	return camelcaseKeysDeep(response);
};

export const getProfileById = async profileId => {
	const response = await factoryApi().get(`profiles/${profileId}`);
	return camelcaseKeysDeep(response);
};

export const createProfile = async iProfileRequest => {
	const response = await factoryApi().post('profiles', iProfileRequest);
	return camelcaseKeysDeep(response);
};

export const updateProfile = async iProfileRequest => {
	const response = await factoryApi().put('profiles', iProfileRequest);
	return camelcaseKeysDeep(response);
};
