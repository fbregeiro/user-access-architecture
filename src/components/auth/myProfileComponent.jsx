// React
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';
import Toggle from 'react-toggle';

// Validation
import { saveMyProfileValidate } from '../../utils/validation';

// Styles and assets
import styles from '../../styles/styles.css';
import css from './myProfileComponent.css';

export const renderToggleInput = field => (
	<Toggle
		checked={field.input.value}
		onChange={field.input.onChange}
		icons={false}
	/>
);

class MyProfileComponent extends Component {
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
		const { user, handleSubmit, submitting } = this.props;
		return (
			<Form onSubmit={handleSubmit} className={styles.form}>
				<h4>Meu Perfil</h4>
				<img src={user.photoUrl} className={css.userImage} />
				<h4>Perfil: {user.profile.description}</h4>
				<div className={styles.field}>
					<h5>Trocar foto:</h5>
					<input type="file" onChange={this.handleFileUpload} />
				</div>
				<div className={styles.field}>
					<h5>Nome:</h5>
					<Field
						type="text"
						component="input"
						placeholder="Nome Completo"
						name="fullName"
						className={styles.basicinput}
					/>
				</div>
				<div className={styles.field}>
					<h5>E-Mail:</h5>
					<Field
						type="text"
						component="input"
						placeholder="E-mail"
						name="email"
						className={styles.basicinput}
					/>
				</div>
				<div className={styles.field}>
					<h5>Documento:</h5>
					<Field
						type="text"
						component="input"
						placeholder="Documento"
						name="documentNumber"
						className={styles.basicinput}
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
						<h5>Senha:</h5>
						<Field
							type="password"
							component="input"
							placeholder="Senha"
							name="password"
							className={styles.basicinput}
						/>
					</div>
				)}
				{this.state.changePassword && (
					<div className={styles.field}>
						<h5>Confirmação de Senha:</h5>
						<Field
							type="password"
							component="input"
							placeholder="Confirmação de Senha"
							name="passwordConfirmation"
							className={styles.basicinput}
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

MyProfileComponent.propTypes = {
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
})(MyProfileComponent);

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
