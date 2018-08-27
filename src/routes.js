// React
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Context
import { UserContext } from './context/userContext';

// Routes
import Signin from './containers/auth/Signin';
import ResetPassword from './containers/auth/ResetPassword';
import PasswordActivation from './containers/auth/PasswordActivation';
import AccountActivation from './containers/auth/AccountActivation';
import Dashboard from './containers/dashboard/Dashboard';
import MyProfile from './containers/auth/MyProfile';
import Users from './containers/admin/Users';
import NewUser from './containers/admin/NewUser';
import Profiles from './containers/admin/Profiles';

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
			<Route exact path="/login" component={Signin} />
			<Route exact path="/reset-password" component={ResetPassword} />
			<Route exact path="/account-activation" component={AccountActivation} />
			<Route exact path="/password-activation" component={PasswordActivation} />
			<PrivateRoute
				path="/my-profile"
				component={MyProfile}
				authorize={false}
			/>
			<PrivateRoute path="/dashboard" component={Dashboard} authorize={false} />
			<PrivateRoute path="/users" component={Users} authorize={true} />
			<PrivateRoute path="/new-user" component={NewUser} authorize={true} />
			<PrivateRoute path="/profiles" component={Profiles} authorize={true} />
		</Switch>
	</div>
);
