// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';

import customFields from '../common/customFields';
import { passwordActivationValidate } from '../../utils/validation';

import styles from '../../styles/styles.css';

class PasswordActivation extends Component {
	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		return (
			<Form onSubmit={handleSubmit} className={styles.form}>
				<h4>
					Entre com o código recebido por email, digite e confirme a sua nova
					senha
				</h4>
				<div className={styles.field}>
					<Field
						id={1}
						label="Código"
						name="token"
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
				<div className={styles.field}>
					<Field
						id={3}
						label="Confirmação de Senha"
						name="passwordConfirmation"
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
						Alterar
					</button>
				</div>
			</Form>
		);
	}
}

PasswordActivation.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

const PasswordActivationForm = reduxForm({
	form: 'passwordActivationForm',
	validate: passwordActivationValidate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(PasswordActivation);

export default PasswordActivationForm;
