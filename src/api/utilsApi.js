import { ApiFactory } from './factoryApi';
import camelcaseKeysDeep from 'camelcase-keys-deep';

const instance = ApiFactory();

export const getSitemapOptions = async () => {
	const response = await instance.get('/api/sitemaps/options');
	return camelcaseKeysDeep(response);
};

export const uploadFile = async (file, name) => {
	const response = await instance.post('/api/file-upload', {
		file: file,
		name: name
	});
	return camelcaseKeysDeep(response);
};
