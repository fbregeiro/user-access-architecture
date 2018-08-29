// React
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';
import Toggle from 'react-toggle';

import customFields from '../common/customFields';
import { saveMyProfileValidate } from '../../utils/validation';

import styles from '../../styles/styles.css';
import css from './MyProfileForm.css';

export const renderToggleInput = field => (
	<Toggle
		checked={field.input.value}
		onChange={field.input.onChange}
		icons={false}
	/>
);

class MyProfile extends Component {
	constructor(props) {
		super(props);
		this.toggleChangePassword = this.toggleChangePassword.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.state = {
			changePassword: false
		};
	}

	toggleChangePassword() {
		this.setState({ changePassword: !this.state.changePassword });
	}

	handleFileUpload(fileUpload) {
		const file = fileUpload.target.files[0];
		this.props.onUploadUserPhoto(file);
	}

	render() {
		const { user, newUserPhotoUrl, handleSubmit, submitting } = this.props;
		return (
			<Form onSubmit={handleSubmit} className={styles.form}>
				<h4>Meu Perfil</h4>
				<img
					src={newUserPhotoUrl ? newUserPhotoUrl : user.photoUrl}
					className={css.userImage}
				/>
				<h4>Perfil: {user.profile.description}</h4>
				<div className={styles.field}>
					<h5>Trocar foto:</h5>
					<input type="file" onChange={this.handleFileUpload} />
				</div>
				<div className={styles.field}>
					<Field
						id={1}
						label="Nome Completo"
						name="fullName"
						component={customFields.Input}
					/>
				</div>
				<div className={styles.field}>
					<Field
						id={2}
						label="E-mail"
						name="email"
						autoComplete="email"
						component={customFields.Input}
					/>
				</div>
				<div className={styles.field}>
					<Field
						id={3}
						label="Documento"
						name="documentNumber"
						component={customFields.Input}
					/>
				</div>
				<div className={styles.field}>
					<h5 htmlFor="changePassword">Trocar senha</h5>
					<input
						id="changePassword"
						type="checkbox"
						onClick={this.toggleChangePassword}
					/>
				</div>
				{this.state.changePassword && (
					<div className={styles.field}>
						<Field
							id={4}
							label="Senha"
							name="password"
							type="password"
							autoComplete="password"
							component={customFields.Input}
						/>
					</div>
				)}
				{this.state.changePassword && (
					<div className={styles.field}>
						<Field
							id={5}
							label="Confirmação de Senha"
							name="passwordConfirmation"
							type="password"
							autoComplete="password"
							component={customFields.Input}
						/>
					</div>
				)}
				<div className={styles.buttons}>
					<button
						type="submit"
						disabled={submitting}
						className={styles.basicbutton}>
						Salvar
					</button>
				</div>
			</Form>
		);
	}
}

MyProfile.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onUploadUserPhoto: PropTypes.func.isRequired
};

const MyProfileForm = reduxForm({
	form: 'myProfileForm',
	validate: saveMyProfileValidate,
	enableReinitialize: true,
	asyncBlurFields: [],
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(MyProfile);

const mapStateToProps = (state, ownProps) => ({
	initialValues: {
		fullName: ownProps.user.fullName,
		documentNumber: ownProps.user.documentNumber,
		email: ownProps.user.email
	},
	dummy_variable_to_avoid_commit_rule_of_unused_var_for_state: state.blablabla
});

export default connect(mapStateToProps, null)(
	reduxForm({ form: 'myProfileForm' })(MyProfileForm)
);
