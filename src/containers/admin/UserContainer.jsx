// React
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createUserByInvitation, updateUser } from '../../actions/userActions';
import { getProfilesByStatus } from '../../actions/profileActions';

import UserForm from '../../components/admin/UserForm';

class UserContainer extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.props.getProfilesByStatus(true);
	}

	handleSubmit = async user => {
		if (user.id === null) {
			await this.props.createUserByInvitation(user);
		} else {
			await this.props.updateUser(user);
		}
		this.props.onSubmit();
	};

	render() {
		const { user, profiles } = this.props;
		return (
			<UserForm
				initialValues={user}
				profiles={profiles}
				onSubmit={this.handleSubmit}
			/>
		);
	}
}

UserContainer.propTypes = {
	user: PropTypes.object,
	onSubmit: PropTypes.func.isRequired
};

//eslint-disable-next-line
const mapStateToProps = (state, ownProps) => ({
	profiles: state.admin.profiles
});

const mapActionToProps = {
	getProfilesByStatus,
	createUserByInvitation,
	updateUser
};

export default connect(mapStateToProps, mapActionToProps)(UserContainer);
