import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserContext } from '../../context/userContext';
import history from '../../store/history';

import MenuComponent from '../../components/common/menuComponent';

import css from './menuContainer.css';

import { userLogout } from '../../actions/authenticationActions';

class MenuContainer extends Component {
	handleUserLogout = () => {
		this.props.userLogout().then(() => {
			history.push('/');
		});
	};
	render() {
		return (
			<div className={css.sidebar}>
				<UserContext.Consumer>
					{({ token, user, userAccess }) =>
						token && (
							<MenuComponent
								user={user}
								userAccess={userAccess}
								onUserLogout={this.handleUserLogout}
							/>
						)
					}
				</UserContext.Consumer>
			</div>
		);
	}
}

const mapActionToProps = {
	userLogout
};

export default connect(null, mapActionToProps)(MenuContainer);
