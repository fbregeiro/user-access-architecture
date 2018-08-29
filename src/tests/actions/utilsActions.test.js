import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as types from '../../actions/actionTypes';

const utilsActions = require('../../actions/utilsActions');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test - utilsActions/getSitemapOptions()', () => {
	it('will get list of sitemap options', () => {
		const store = mockStore();

		return store.dispatch(utilsActions.getSitemapsOptions()).then(() => {
			const actions = store.getActions();

			// Expecting to receive BEGIN_AJAX_CALL + GET_SITEMAP_OPTIONS.
			expect(actions.length).toEqual(2);
			expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
			expect(actions[1].type).toEqual(types.GET_SITEMAP_OPTIONS_SUCCESS);

			// Expect to receive 1 record from mocked api.
			const profilesList = actions[1];
			expect(profilesList).toBeDefined();
			expect(profilesList.payload).toBeDefined();
			expect(profilesList.payload.length).toEqual(3);
			expect(profilesList.payload[0].id).toEqual(1);
		});
	});
});

describe('test - utilsActions/uploadFile()', () => {
	it('will upload a file', () => {
		const store = mockStore();

		const iFileUploadRequest = { file: 'arquivo.png', name: 'arquivo01' };

		return store
			.dispatch(utilsActions.uploadFile(iFileUploadRequest))
			.then(() => {
				const actions = store.getActions();

				// Expecting to receive BEGIN_AJAX_CALL + UPLOAD_FILE.
				expect(actions.length).toEqual(2);
				expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
				expect(actions[1].type).toEqual(types.UPLOAD_FILE_SUCCESS);

				// Expect to receive 1 record from mocked api.
				const iFileUploadResponse = actions[1];
				expect(iFileUploadResponse).toBeDefined();
				expect(iFileUploadResponse.payload).toBeDefined();
				expect(iFileUploadResponse.payload.isSuccess).toEqual(true);
			});
	});
});
