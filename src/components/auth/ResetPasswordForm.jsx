// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';

import customFields from '../common/customFields';
import { resetPasswordValidate } from '../../utils/validation';

import styles from '../../styles/styles.css';

class ResetPassword extends Component {
	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		return (
			<Form onSubmit={handleSubmit} className={styles.form}>
				<h4>
					Informe seu e-mail e te enviaremos um link seguro para que possa
					reiniciar sua senha
				</h4>
				<div className={styles.field}>
					<Field
						id={1}
						label="E-mail"
						name="email"
						autoComplete="email"
						component={customFields.Input}
					/>
				</div>
				<div className={styles.buttons}>
					<button
						type="submit"
						disabled={pristine || submitting}
						className={styles.basicbutton}>
						Solicitar reinicialização de senha
					</button>
				</div>
			</Form>
		);
	}
}

ResetPassword.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

const ResetPasswordForm = reduxForm({
	form: 'resetPasswordForm',
	validate: resetPasswordValidate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(ResetPassword);

export default ResetPasswordForm;
