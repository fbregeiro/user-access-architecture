import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';

import history from '../store/history';
import routes from '../routes';

import { getData, USER_DATA } from '../utils/persistency';
import { userLogin, userLogout } from '../actions/authenticationActions';
import { UserContext } from '../context/userContext';

import Header from './common/headerContainer';
import MenuComponent from '../components/common/menuComponent';

import css from './app.css';

class App extends React.Component {
	constructor(props) {
		super(props);

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
				const userData = getData(USER_DATA);

				this.setState(state => ({
					...state,
					user: userData.user
				}));
				history.push('/dashboard');
			});
		};

		this.loadUserContext = () => {
			const userData = getData(USER_DATA);
			this.state = {
				user: userData ? userData.user : null,
				userAccess: userData ? userData.userAccess : null,
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
							{this.state.user && (
								<div className={css.sidebar}>
									<MenuComponent />
								</div>
							)}
							<div className={css.mainContent}>{routes}</div>
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
