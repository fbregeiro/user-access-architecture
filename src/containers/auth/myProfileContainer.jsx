import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../store/history';

import { updateUser } from '../../actions/userActions';

import { uploadFile } from '../../actions/utilsActions';

import MyProfileForm from '../../components/auth/myProfileComponent';

import { getData, USER_DATA } from '../../utils/persistency';

class MyProfileContainer extends Component {
	constructor(props) {
		super(props);
		this.loadUser = this.loadUser.bind(this);
		this.handleSaveMyProfile = this.handleSaveMyProfile.bind(this);
		this.handleUploadUserPhoto = this.handleUploadUserPhoto.bind(this);
		this.state = { user: null };
	}

	componentWillMount() {
		this.loadUser();
	}

	loadUser = () => {
		const userData = getData(USER_DATA);
		this.setState({
			user: userData ? userData.user : null
		});
	};

	handleSaveMyProfile = user => {
		const userUpdateRequest = {
			id: this.state.user.id,
			fullName: user.fullName,
			documentNumber: user.documentNumber,
			email: user.email,
			photoUrl: this.state.user.photoUrl,
			password: null
		};

		if (
			user.password !== null &&
			user.passwordConfirmation !== null &&
			user.password === user.passwordConfirmation
		) {
			userUpdateRequest.password = user.password;
		}

		this.props.updateUser(userUpdateRequest).then(() => {
			history.push('/dashboard');
		});
	};

	handleUploadUserPhoto = file => {
		this.props
			.uploadFile(file, this.state.user.fullName)
			.then(uploadFileResponse => {
				if (uploadFileResponse && uploadFileResponse.payload.isSuccess) {
					const user = this.state.user;
					user.photoUrl = uploadFileResponse.payload.fileUrl;
					this.setState({ user: user });
				}
			});
	};

	render() {
		return (
			<div>
				{this.state.user && (
					<MyProfileForm
						user={this.state.user}
						onSubmit={this.handleSaveMyProfile}
						onUploadUserPhoto={this.handleUploadUserPhoto}
					/>
				)}
			</div>
		);
	}
}

const mapActionToProps = {
	updateUser,
	uploadFile
};

export default connect(null, mapActionToProps)(MyProfileContainer);
