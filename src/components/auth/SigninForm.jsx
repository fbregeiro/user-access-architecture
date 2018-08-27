// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';

import customFields from '../common/customFields';
import { signinValidate } from '../../utils/validation';

import styles from '../../styles/styles.css';

class Signin extends Component {
	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		return (
			<Form onSubmit={handleSubmit} className={styles.form}>
				<h4>Informe suas credencias para acessar a plataforma</h4>
				<div className={styles.field}>
					<Field
						id={1}
						label="E-mail"
						name="email"
						autoComplete="email"
						component={customFields.Input}
					/>
				</div>
				<div className={styles.field}>
					<Field
						id={2}
						label="Senha"
						name="password"
						type="password"
						autoComplete="password"
						component={customFields.Input}
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

Signin.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

const SigninForm = reduxForm({
	form: 'signin-form',
	validate: signinValidate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(Signin);

export default SigninForm;
