import * as api from '../api/profileApi';
import { ajaxFailure, beginAjaxCall } from './ajaxStatusAction';
import {
	GET_PROFILES_BY_STATUS,
	GET_PROFILE_BY_ID,
	CREATE_PROFILE,
	UPDATE_PROFILE
} from '../actions/actionTypes';

export const getProfilesByStatus = isActive => async dispatch => {
	dispatch(beginAjaxCall());
	try {
		const iProfiles = await api.getProfilesByStatus(isActive);

		dispatch({
			type: GET_PROFILES_BY_STATUS,
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
			type: GET_PROFILE_BY_ID,
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
			type: CREATE_PROFILE,
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
			type: UPDATE_PROFILE,
			payload: iProfile.data
		});
	} catch (error) {
		dispatch(ajaxFailure(error.response));
		throw error;
	}
};
