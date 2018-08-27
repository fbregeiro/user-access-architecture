import * as api from '../api/utilsApi';
import { ajaxFailure, beginAjaxCall } from './ajaxStatusAction';
import {
	GET_SITEMAP_OPTIONS_SUCCESS,
	UPLOAD_FILE_SUCCESS
} from '../actions/actionTypes';

export const getSitemapsOptions = () => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		const iSitemaps = await api.getSitemapOptions();

		dispatch({
			type: GET_SITEMAP_OPTIONS_SUCCESS,
			payload: iSitemaps.data
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

		return dispatch({
			type: UPLOAD_FILE_SUCCESS,
			payload: iFileUploadResponse.data
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};
