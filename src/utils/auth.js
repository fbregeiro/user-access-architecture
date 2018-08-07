import { getData } from './persistency';

export const AUTHENTICATION_DATA = 'authentication_data';

const authentication = {
	isAuthenticated() {
		const authenticationData = getData(AUTHENTICATION_DATA);
		return authenticationData !== null && authenticationData.token !== null;
	}
};

export default authentication;
