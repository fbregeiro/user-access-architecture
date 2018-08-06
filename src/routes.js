import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loginContainer from './containers/auth/loginContainer';

export default (
	<div>
		<Switch>
			<Route exact path="/" component={null} />
			<Route exact path="/login" component={loginContainer} />
		</Switch>
	</div>
);
