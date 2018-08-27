import { ApiFactory } from './factoryApi';
import camelcaseKeysDeep from 'camelcase-keys-deep';

const instance = ApiFactory();

export const getSitemapOptions = async () => {
	const response = await instance.get('/api/sitemaps/options');
	return camelcaseKeysDeep(response);
};

export const uploadFile = async (file, name) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('name', name);
	const config = {
		headers: {
			'content-type': 'multipart/form-data'
		}
	};
	const response = await instance.post('/api/file-upload', formData, config);
	return camelcaseKeysDeep(response);
};
