import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';

import history from '../store/history';
import Header from './common/header';
import routes from '../routes';

import {
	userLogin,
	userLogout,
	AUTHENTICATION_DATA
} from '../actions/authenticationActions';
import { getData } from '../utils/persistency';

import { UserContext } from '../context/userContext';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.getUserInformation = () => {
			const authenticationData = getData(AUTHENTICATION_DATA);
			return authenticationData;
		};

		this.performLogout = () => {
			this.props.userLogout().then(() => {
				this.setState(state => ({
					...state,
					user: {}
				}));
				history.push('/');
			});
		};

		this.performLogin = values => {
			this.props.userLogin(values).then(() => {
				const user = this.getUserInformation();
				this.setState(state => ({
					...state,
					user: user
				}));
				history.push('/dashboard');
			});
		};

		this.loadUserContext = () => {
			const user = this.getUserInformation();
			this.state = {
				user: user,
				performLogout: this.performLogout,
				performLogin: this.performLogin
			};
		};
	}

	componentDidCatch() {
		//DO SOMETHING ( error ) = PARAM
	}

	render() {
		this.loadUserContext();
		return (
			<UserContext.Provider value={this.state}>
				<div>
					<ConnectedRouter history={history}>
						<div>
							{Header({
								isFetching: this.props.isFetching
							})}
							{routes}
						</div>
					</ConnectedRouter>
				</div>
			</UserContext.Provider>
		);
	}
}

// Validation
App.propTypes = {
	isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isFetching: state.ajax.inProgress > 0
});

const mapActionToProps = {
	userLogin,
	userLogout
};

export default hot(module)(connect(mapStateToProps, mapActionToProps)(App));
