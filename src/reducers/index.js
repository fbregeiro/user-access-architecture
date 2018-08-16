import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ajax from './ajaxStatusReducer';
import admin from './adminReducer';

const rootReducer = combineReducers({
	form: formReducer,
	ajax,
	admin
});

export default rootReducer;
