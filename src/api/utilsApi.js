import factoryApi from './factoryApi';
import camelcaseKeysDeep from 'camelcase-keys-deep';

export const getSitemapOptions = async () => {
	const response = await factoryApi().get('sitemaps/options');
	return camelcaseKeysDeep(response);
};

export const uploadFile = async (file, name) => {
	const response = await factoryApi().post('file-upload', {
		file: file,
		name: name
	});
	return camelcaseKeysDeep(response);
};
