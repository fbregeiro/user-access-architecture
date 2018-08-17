import axios from 'axios';
import config from '../config';

export const ApiFactory = () => {
	const { api } = config;

	const httpConfig = {
		baseURL: api.baseUri
	};

	const instance = axios.create(httpConfig);

	const token = localStorage.getItem(api.tokenKey);
	if (token) {
		instance.defaults.headers.common['token'] = token;
	}

	// TODO: Use this when using the real API
	// instance.interceptors.request.use(
	// 	config => {
	// 		const token = localStorage.getItem(api.tokenKey);

	// 		config.headers = {
	// 			token: token || null
	// 		};
	// 		return config;
	// 	},
	// 	error => Promise.reject(error)
	// );

	return instance;
};
