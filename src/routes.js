// React
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Context
import { UserContext } from './context/userContext';

// Routes
import loginContainer from './containers/auth/loginContainer';
import resetPasswordContainer from './containers/auth/resetPasswordContainer';
import passwordActivationContainer from './containers/auth/passwordActivationContainer';
import accountActivationContainer from './containers/auth/accountActivationContainer';
import dashboardContainer from './containers/dashboard/dashboardContainer';
import myProfileContainer from './containers/auth/myProfileContainer';
import usersContainer from './containers/admin/users/usersContainer';
import newUserContainer from './containers/admin/users/newUserContainer';
import profilesContainer from './containers/admin/profiles/profilesContainer';

function PrivateRoute({ component: Component, ...rest }) {
	return (
		<UserContext.Consumer>
			{({ token }) => (
				<Route
					{...rest}
					render={props =>
						token !== null ? (
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
				path="/account-activation"
				component={accountActivationContainer}
			/>
			<Route
				exact
				path="/password-activation"
				component={passwordActivationContainer}
			/>
			<PrivateRoute path="/dashboard" component={dashboardContainer} />
			<PrivateRoute path="/my-profile" component={myProfileContainer} />
			<PrivateRoute path="/users" component={usersContainer} />
			<PrivateRoute path="/new-user" component={newUserContainer} />
			<PrivateRoute path="/profiles" component={profilesContainer} />
		</Switch>
	</div>
);
