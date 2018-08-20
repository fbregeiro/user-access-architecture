import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../store/history';

import { updateUser } from '../../actions/userActions';
import { uploadFile } from '../../actions/utilsActions';

import MyProfileForm from '../../components/auth/myProfileComponent';

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
		this.setState({
			user: this.props.user,
			newUserPhotoUrl: null
		});
	};

	handleSaveMyProfile = user => {
		const userUpdateRequest = {
			id: this.state.user.id,
			fullName: user.fullName,
			documentNumber: user.documentNumber,
			email: user.email,
			photoUrl: this.state.newUserPhotoUrl
				? this.state.newUserPhotoUrl
				: this.state.user.photoUrl,
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
					this.setState({
						newUserPhotoUrl: uploadFileResponse.payload.fileUrl
					});

					// const user = this.props.user;
					// user.photoUrl = uploadFileResponse.payload.fileUrl;
					// this.setState({ user: user });
				}
			});
	};

	render() {
		return (
			<div>
				{this.state.user && (
					<MyProfileForm
						user={this.props.user}
						newUserPhotoUrl={this.state.newUserPhotoUrl}
						onSubmit={this.handleSaveMyProfile}
						onUploadUserPhoto={this.handleUploadUserPhoto}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user
});

const mapActionToProps = {
	updateUser,
	uploadFile
};

export default connect(mapStateToProps, mapActionToProps)(MyProfileContainer);
