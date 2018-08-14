import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../store/history';

import { updateUser } from '../../actions/userActions';

import MyProfileForm from '../../components/auth/myProfileComponent';
import { UserContext } from '../../context/userContext';

class MyProfileContainer extends Component {
	handleSaveMyProfile = user => {
		this.props.updateUser(user).then(() => {
			history.push('/dashboard');
		});
	};

	render() {
		return (
			<UserContext.Consumer>
				{({ user }) => (
					<div>
						<MyProfileForm user={user} onSubmit={this.handleSaveMyProfile} />;
					</div>
				)}
			</UserContext.Consumer>
		);
	}
}

const mapActionToProps = {
	updateUser
};

export default connect(null, mapActionToProps)(MyProfileContainer);
