import { getData } from './persistency';

export const AUTHENTICATION_DATA = 'authentication_data';

export const getAuthenticationData = () => {
	const authenticationData = getData(AUTHENTICATION_DATA);
	return authenticationData;
};
