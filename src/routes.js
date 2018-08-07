import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
//import authentication from './utils/auth';

import loginContainer from './containers/auth/loginContainer';
import dashboardContainer from './containers/dashboard/dashboardContainer';
import usersContainer from './containers/users/usersContainer';

import { UserContext } from './context/userContext';

function PrivateRoute({ component: Component, ...rest }) {
	return (
		<UserContext.Consumer>
			{userContext => (
				<Route
					{...rest}
					render={props =>
						userContext.user !== null && userContext.user.token !== null ? (
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
			<PrivateRoute path="/dashboard" component={dashboardContainer} />
			<PrivateRoute path="/users" component={usersContainer} />
		</Switch>
	</div>
);
