// Keys used to store data in local storage
export const USER_DATA = 'user_data';

export const saveData = (key, value) => {
	try {
		return localStorage.setItem(key, JSON.stringify(value));
	} catch (err) {
		/* eslint no-console: 0 */
		console.log(
			'Could not persist local data. Local storage is probably disabled.'
		);
		/* eslint no-console: 1 */
	}
};

export const getData = key => {
	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (err) {
		return null;
	}
};

export const deleteData = key => {
	try {
		return localStorage.removeItem(key);
	} catch (err) {
		/*eslint-disable no-console, no-unused-vars*/
		console.log(
			'Could not delete local data. Local storage is probably disabled.'
		);
	}
};
