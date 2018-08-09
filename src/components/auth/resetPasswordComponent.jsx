// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';

// Validation
import { resetPasswordValidate } from '../../utils/validation';

// Styles and assets
import styles from '../../styles/styles.css';
import css from './resetPasswordComponent.css';

class ResetPasswordComponent extends Component {
	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		return (
			<Form onSubmit={handleSubmit} className={css.form}>
				<h4>
					Informe seu e-mail e te enviaremos um link seguro para que possa
					reiniciar sua senha
				</h4>
				<div className={css.field}>
					<h5>E-Mail:</h5>
					<Field
						type="text"
						component="input"
						placeholder="E-mail"
						name="email"
						className={css.input}
					/>
				</div>
				<div className={css.field}>
					<button
						type="submit"
						disabled={pristine || submitting}
						className={styles.primaryButton}>
						<span key={1} className={styles.primaryButtonLabel}>
							Solicitar reinicialização de senha
						</span>
					</button>
				</div>
			</Form>
		);
	}
}

ResetPasswordComponent.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

const ResetPasswordForm = reduxForm({
	form: 'resetPasswordForm',
	validate: resetPasswordValidate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(ResetPasswordComponent);

export default ResetPasswordForm;
