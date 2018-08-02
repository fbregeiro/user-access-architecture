import * as api from '../api/utilsApi';
import { ajaxFailure, beginAjaxCall } from './ajaxStatusAction';
import { GET_SITEMAP_OPTIONS, UPLOAD_FILE } from '../actions/actionTypes';

export const getSitemapsOptions = () => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		const iSitemaps = await api.getSitemapOptions();

		dispatch({
			type: GET_SITEMAP_OPTIONS,
			payload: iSitemaps
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};

export const uploadFile = (file, name) => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		const iFileUploadResponse = await api.uploadFile(file, name);

		dispatch({
			type: UPLOAD_FILE,
			payload: iFileUploadResponse
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};
