import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as types from './actionTypes';

const authenticationActions = require('./authenticationActions');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test - authenticationActions/login()', () => {
	it('will perform login and check authentication data', () => {
		// const expectedActions = [
		//   { type: types.AUTHENTICATION_LOGIN, body: { authenticationLoginData: {} } }
		// ]
		const store = mockStore({ authenticationLoginData: {} });

		return store
			.dispatch(
				authenticationActions.userLogin({ email: 'user', password: 'password' })
			)
			.then(() => {
				const actions = store.getActions();

				// Must receive BEGIN_AJAX_CALL + AUTHENTICATION_LOGIN.
				expect(actions.length).toEqual(2);
				expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
				expect(actions[1].type).toEqual(types.AUTHENTICATION_LOGIN);

				const authenticationData = actions[1];
				expect(authenticationData.token).toEqual(
					'163984e2-e2ce-415d-8ce2-66cab5e014f1'
				);
			});
	});

	// describe('test - authenticationActions/logout()', () => {
	// 	it('will perform logout and check authenticationData inside localStorage', () => {
	// 		expect(true).toEqual(true);
	// 	});
	// });
});
