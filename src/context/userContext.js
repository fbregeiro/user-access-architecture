import React from 'react';

export const user = {
	isLoggedIn: false,
	userId: 0,
	fullName: null,
	email: null,
	token: null,
	userAccess: {}
};

export const UserContext = React.createContext({
	user: user,
	performLogin: () => {},
	performLogout: () => {}
});
