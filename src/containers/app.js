import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';

import history from '../store/history';
import routes from '../routes';

import { UserContext } from '../context/userContext';

import Header from './common/headerContainer';
import MenuContainer from './common/menuContainer';

import css from './app.css';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<UserContext.Provider value={this.props.userData}>
				<div>
					<ConnectedRouter history={history}>
						<div>
							{Header({
								isFetching: this.props.isFetching
							})}
							{this.props.userData.user && <MenuContainer />}
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
	isFetching: state.ajax.inProgress > 0,
	userData: state.auth
});

const mapActionToProps = {};

export default hot(module)(connect(mapStateToProps, mapActionToProps)(App));
