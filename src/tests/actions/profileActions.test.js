import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as types from '../../actions/actionTypes';

const profileActions = require('../../actions/profileActions');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test - profileActions/getProfilesByStatus()', () => {
	it('will get list of profiles filtering by status', () => {
		const store = mockStore();

		return store.dispatch(profileActions.getProfilesByStatus(true)).then(() => {
			const actions = store.getActions();

			// Expecting to receive BEGIN_AJAX_CALL + GET_PROFILE_BY_STATUS.
			expect(actions.length).toEqual(2);
			expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
			expect(actions[1].type).toEqual(types.GET_PROFILES_BY_STATUS_SUCCESS);

			// Expect to receive 2 records from mocked api.
			const profilesList = actions[1];
			expect(profilesList).toBeDefined();
			expect(profilesList.payload).toBeDefined();
			expect(profilesList.payload.length).toEqual(3);
			expect(profilesList.payload[0].description).toEqual('Administrador');
			expect(profilesList.payload[1].description).toEqual('Gerente');
			expect(profilesList.payload[2].description).toEqual('Operador');
		});
	});
});

describe('test - profileActions/getProfileById()', () => {
	it('will get a specific user', () => {
		const store = mockStore();

		return store.dispatch(profileActions.getProfileById(1)).then(() => {
			const actions = store.getActions();

			// Expecting to receive BEGIN_AJAX_CALL + GET_PROFILE_BY_ID.
			expect(actions.length).toEqual(2);
			expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
			expect(actions[1].type).toEqual(types.GET_PROFILE_BY_ID_SUCCESS);

			// Expect to receive 1 record from mocked api.
			const usersList = actions[1];
			expect(usersList).toBeDefined();
			expect(usersList.payload).toBeDefined();
			expect(usersList.payload.description).toEqual('Administrador');
		});
	});
});

describe('test - profileActions/createProfile()', () => {
	it('will create a new profile', () => {
		const store = mockStore();

		const iProfile = { description: 'Administrador' };

		return store.dispatch(profileActions.createProfile(iProfile)).then(() => {
			const actions = store.getActions();

			// Expecting to receive BEGIN_AJAX_CALL + CREATE_PROFILE.
			expect(actions.length).toEqual(2);
			expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
			expect(actions[1].type).toEqual(types.CREATE_PROFILE_SUCCESS);

			// Expect to receive 1 record from mocked api.
			const profile = actions[1];
			expect(profile).toBeDefined();
			expect(profile.payload).toBeDefined();
			expect(profile.payload.description).toEqual('Administrador');
		});
	});
});

describe('test - profileActions/updateProfile()', () => {
	it('will update an existing profile', () => {
		const store = mockStore();

		const iProfileRequest = { description: 'Administrador' };

		return store
			.dispatch(profileActions.updateProfile(iProfileRequest))
			.then(() => {
				const actions = store.getActions();

				// Expecting to receive BEGIN_AJAX_CALL + UPDATE_PROFILE.
				expect(actions.length).toEqual(2);
				expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
				expect(actions[1].type).toEqual(types.UPDATE_PROFILE_SUCCESS);

				// Expect to receive 1 record from mocked api.
				const profile = actions[1];
				expect(profile).toBeDefined();
				expect(profile.payload).toBeDefined();
				expect(profile.payload.description).toEqual('Administrador');
			});
	});
});
