export default {
	app: {
		baseUri: process.env.APP_URL || 'http://localhost:3000'
	},
	api: {
		tokenKey: 'authentication-user-token',
		baseUri: process.env.API_URL || 'http://localhost:3001'
	}
};
