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

const canRenderComponent = (
	user,
	userAccess,
	propsLocation,
	needsAuthorization
) => {
	var isAuthorized = false;
	if (user !== null && user.id !== null) {
		if (needsAuthorization) {
			if (userAccess !== null) {
				userAccess.map(section => {
					if (section.sectionMenus !== null) {
						section.sectionMenus.map(sectionMenu => {
							if (sectionMenu.route === propsLocation.pathname) {
								isAuthorized = true;
							}
							if (sectionMenu.subMenus !== null) {
								sectionMenu.subMenus.map(subMenu => {
									if (subMenu.route === propsLocation.pathname) {
										isAuthorized = true;
									}
								});
							}
						});
					}
				});
			}
		} else {
			isAuthorized = true;
		}
	}
	return isAuthorized;
};

function PrivateRoute({ component: Component, authorize, ...rest }) {
	return (
		<UserContext.Consumer>
			{({ user, userAccess }) => (
				<Route
					{...rest}
					render={props =>
						canRenderComponent(user, userAccess, props.location, authorize) ? (
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
			<PrivateRoute
				path="/my-profile"
				component={myProfileContainer}
				authorize={false}
			/>
			<PrivateRoute
				path="/dashboard"
				component={dashboardContainer}
				authorize={false}
			/>
			<PrivateRoute path="/users" component={usersContainer} authorize={true} />
			<PrivateRoute
				path="/new-user"
				component={newUserContainer}
				authorize={true}
			/>
			<PrivateRoute
				path="/profiles"
				component={profilesContainer}
				authorize={true}
			/>
		</Switch>
	</div>
);
