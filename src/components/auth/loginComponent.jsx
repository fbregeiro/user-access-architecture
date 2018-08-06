// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';

// Validation
import { loginValidate } from '../../utils/validation';

// Styles and assets
import styles from '../../styles/styles.css';

class LoginComponent extends Component {
	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		return (
			<Form onSubmit={handleSubmit}>
				<div>
					<Field
						type="text"
						component="input"
						placeholder="E-mail"
						name="email"
					/>
					<Field
						type="password"
						component="input"
						placeholder="Senha"
						name="password"
					/>
				</div>
				<div>
					<button
						type="submit"
						disabled={pristine || submitting}
						className={styles.primaryButton}>
						<span key={1} className={styles.primaryButtonLabel}>
							Login
						</span>
					</button>
				</div>
			</Form>
		);
	}
}

LoginComponent.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

const LoginForm = reduxForm({
	form: 'loginForm',
	validate: loginValidate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(LoginComponent);

export default LoginForm;
