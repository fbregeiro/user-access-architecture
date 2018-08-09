import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import loginContainer from './containers/auth/loginContainer';
import resetPasswordContainer from './containers/auth/resetPasswordContainer';
import passwordActivationContainer from './containers/auth/passwordActivationContainer';
import dashboardContainer from './containers/dashboard/dashboardContainer';
import usersContainer from './containers/admin/users/usersContainer';

import { UserContext } from './context/userContext';

function PrivateRoute({ component: Component, ...rest }) {
	return (
		<UserContext.Consumer>
			{({ user }) => (
				<Route
					{...rest}
					render={props =>
						user !== null && user.token !== null ? (
							<Component {...props} />
						) : (
							<Redirect
								to={{ pathname: '/login', state: { from: props.location } }}
							/>
						)
					}
				/>
			)}
		</UserContext.Consumer>
	);
}

export default (
	<div>
		<Switch>
			<Route exact path="/" component={null} />
			<Route exact path="/login" component={loginContainer} />
			<Route exact path="/reset-password" component={resetPasswordContainer} />
			<Route
				exact
				path="/password-activation"
				component={passwordActivationContainer}
			/>
			<PrivateRoute path="/dashboard" component={dashboardContainer} />
			<PrivateRoute path="/admin/users" component={usersContainer} />
		</Switch>
	</div>
);
