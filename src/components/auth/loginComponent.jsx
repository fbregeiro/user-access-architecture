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
			<Form onSubmit={handleSubmit} className={styles.form}>
				<h4>Informe suas credencias para acessar a plataforma</h4>
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
					<h5>Senha:</h5>
					<Field
						type="password"
						component="input"
						placeholder="Senha"
						name="password"
						className={styles.basicinput}
					/>
				</div>
				<div className={styles.buttons}>
					<button
						type="submit"
						disabled={pristine || submitting}
						className={styles.basicbutton}>
						Login
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
