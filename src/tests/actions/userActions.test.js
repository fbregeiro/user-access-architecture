import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as types from '../../actions/actionTypes';

const userActions = require('../../actions/userActions');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test - userActions/getUsersByStatus()', () => {
	it('will get list of users filtering by status', () => {
		const store = mockStore();

		return store.dispatch(userActions.getUsersByStatus(true)).then(() => {
			const actions = store.getActions();

			// Expecting to receive BEGIN_AJAX_CALL + GET_USERS_BY_STATUS.
			expect(actions.length).toEqual(2);
			expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
			expect(actions[1].type).toEqual(types.GET_USERS_BY_STATUS);

			// Expect to receive 2 records from mocked api.
			const usersList = actions[1];
			expect(usersList).toBeDefined();
			expect(usersList.payload).toBeDefined();
			expect(usersList.payload.length).toEqual(2);
			expect(usersList.payload[0].fullName).toEqual('Freddie Bregeiro');
			expect(usersList.payload[1].fullName).toEqual('Leandro Amaral Ferreira');
		});
	});
});

describe('test - userActions/getUserById()', () => {
	it('will get a specific user', () => {
		const store = mockStore();

		return store.dispatch(userActions.getUserById(1)).then(() => {
			const actions = store.getActions();

			// Expecting to receive BEGIN_AJAX_CALL + GET_USER_BY_ID.
			expect(actions.length).toEqual(2);
			expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
			expect(actions[1].type).toEqual(types.GET_USER_BY_ID);

			// Expect to receive 1 record from mocked api.
			const usersList = actions[1];
			expect(usersList).toBeDefined();
			expect(usersList.payload).toBeDefined();
			expect(usersList.payload.fullName).toEqual('Freddie Bregeiro');
		});
	});
});

describe('test - userActions/createUserByInvitation()', () => {
	it('will create a new user', () => {
		const store = mockStore();

		const iUser = { id: 1, fullName: 'Freddie Bregeiro' };

		return store
			.dispatch(userActions.createUserByInvitation(iUser))
			.then(() => {
				const actions = store.getActions();

				// Expecting to receive BEGIN_AJAX_CALL + CREATE_USER_BY_INVITATION.
				expect(actions.length).toEqual(2);
				expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
				expect(actions[1].type).toEqual(types.CREATE_USER_BY_INVITATION);

				// Expect to receive 1 record from mocked api.
				const usersList = actions[1];
				expect(usersList).toBeDefined();
				expect(usersList.payload).toBeDefined();
				expect(usersList.payload.fullName).toEqual('Freddie Bregeiro');
			});
	});
});

describe('test - userActions/updateUser()', () => {
	it('will update an existing user', () => {
		const store = mockStore();

		const iUser = { id: 1, fullName: 'Freddie Bregeiro' };

		return store.dispatch(userActions.updateUser(iUser)).then(() => {
			const actions = store.getActions();

			// Expecting to receive BEGIN_AJAX_CALL + UPDATE_USER.
			expect(actions.length).toEqual(2);
			expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
			expect(actions[1].type).toEqual(types.UPDATE_USER);

			// Expect to receive 1 record from mocked api.
			const usersList = actions[1];
			expect(usersList).toBeDefined();
			expect(usersList.payload).toBeDefined();
			expect(usersList.payload.fullName).toEqual('Freddie Bregeiro');
		});
	});
});

describe('test - userActions/activateUser()', () => {
	it('will activate an user', () => {
		const store = mockStore();

		const iUserActivationRequest = { id: 1, fullName: 'Freddie Bregeiro' };

		return store
			.dispatch(userActions.activateUser(iUserActivationRequest))
			.then(() => {
				const actions = store.getActions();

				// Expecting to receive BEGIN_AJAX_CALL + ACTIVATE_USER.
				expect(actions.length).toEqual(2);
				expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
				expect(actions[1].type).toEqual(types.ACTIVATE_USER);

				// Nothing expected as result.
				expect(actions[1].payload).toBeUndefined();
			});
	});
});
