import * as api from '../api/profileApi';
import { ajaxFailure, beginAjaxCall } from './ajaxStatusAction';
import {
	GET_PROFILES_BY_STATUS_SUCCESS,
	GET_PROFILE_BY_ID_SUCCESS,
	CREATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_SUCCESS
} from '../actions/actionTypes';

export const getProfilesByStatus = isActive => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		const iProfiles = await api.getProfilesByStatus(isActive);

		dispatch({
			type: GET_PROFILES_BY_STATUS_SUCCESS,
			payload: iProfiles.data
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};

export const getProfileById = profileId => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		const iProfile = await api.getProfileById(profileId);

		dispatch({
			type: GET_PROFILE_BY_ID_SUCCESS,
			payload: iProfile.data
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};

export const createProfile = iProfileRequest => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		const iProfile = await api.createProfile(iProfileRequest);

		dispatch({
			type: CREATE_PROFILE_SUCCESS,
			payload: iProfile.data
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};

export const updateProfile = iProfileRequest => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		const iProfile = await api.updateProfile(iProfileRequest);

		dispatch({
			type: UPDATE_PROFILE_SUCCESS,
			payload: iProfile.data
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};
