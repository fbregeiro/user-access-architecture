import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as types from '../../actions/actionTypes';

const authenticationActions = require('../../actions/authenticationActions');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test - authenticationActions/login()', () => {
	it('will perform login', () => {
		const store = mockStore();

		return store
			.dispatch(
				authenticationActions.userLogin({ email: 'user', password: 'password' })
			)
			.then(() => {
				const actions = store.getActions();

				// Expecting to receive BEGIN_AJAX_CALL + AUTHENTICATION_LOGIN.
				expect(actions.length).toEqual(2);
				expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
				expect(actions[1].type).toEqual(types.AUTHENTICATION_LOGIN);

				const userData = actions[1].payload;
				expect(userData.user).toBeDefined();
				expect(userData.user.id).toEqual(1);
			});
	});
});

describe('test - authenticationActions/resetPassword()', () => {
	it('will reset password', () => {
		const store = mockStore({});

		return store
			.dispatch(authenticationActions.resetUserPassword('fbregeiro@gmail.com'))
			.then(() => {
				const actions = store.getActions();

				// Expecting to receive BEGIN_AJAX_CALL + AUTHENTICATION_RESET_PASSWORD.
				expect(actions.length).toEqual(2);
				expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
				expect(actions[1].type).toEqual(types.AUTHENTICATION_RESET_PASSWORD);
			});
	});
});

describe('test - authenticationActions/changePassword()', () => {
	it('will change password', () => {
		const store = mockStore({});

		const iChangePasswordRequest = {
			token: '163984e2-e2ce-415d-8ce2-66cab5e014f1',
			password: '123456'
		};

		return store
			.dispatch(
				authenticationActions.changeUserPassword(iChangePasswordRequest)
			)
			.then(() => {
				const actions = store.getActions();

				// Expecting to receive BEGIN_AJAX_CALL + AUTHENTICATION_CHANGE_PASSWORD.
				expect(actions.length).toEqual(2);
				expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
				expect(actions[1].type).toEqual(types.AUTHENTICATION_CHANGE_PASSWORD);
			});
	});
});
