import axios from 'axios';

import { getData } from '../utils/persistency';
import { AUTHENTICATION_DATA } from '../actions/authenticationActions';
import config from '../config';

const axiosClient = axios.create({
	baseURL: config.api.baseUri
});

const errorHandler = error => {
	if (
		!error.response ||
		!error.response.data ||
		!error.response.data.errorMessage
	) {
		throw 'Erro inesperado';
	} else {
		throw error.response.data.errorMessage;
	}
};

const post = (...args) => axiosClient.post(...args).catch(errorHandler);
const get = (...args) => axiosClient.get(...args).catch(errorHandler);
const put = (...args) => axiosClient.put(...args).catch(errorHandler);
const _delete = (...args) => axiosClient.delete(...args).catch(errorHandler);

export default () => {
	const authenticationData = getData(AUTHENTICATION_DATA);

	if (authenticationData && authenticationData.token) {
		axiosClient.defaults.headers.common['Authorization'] =
			authenticationData.token;
	}

	return {
		post,
		get,
		put,
		delete: _delete
	};
};
