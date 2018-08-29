// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';

import customFields from '../common/customFields';
import { accountActivationValidate } from '../../utils/validation';

import styles from '../../styles/styles.css';

class AccountActivation extends Component {
	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		return (
			<Form onSubmit={handleSubmit} className={styles.form}>
				<h4>
					Para ativar o seu cadastro, informe o código do convite recebido por
					e-mail
				</h4>
				<div className={styles.field}>
					<Field
						id={1}
						label="Convite"
						name="accessCode"
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
						label="Senha"
						name="password"
						type="password"
						autoComplete="password"
						component={customFields.Input}
					/>
				</div>
				<div className={styles.field}>
					<Field
						id={4}
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
						Cadastrar
					</button>
				</div>
			</Form>
		);
	}
}

AccountActivation.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

const AccountActivationForm = reduxForm({
	form: 'accountActivationForm',
	validate: accountActivationValidate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(AccountActivation);

export default AccountActivationForm;
