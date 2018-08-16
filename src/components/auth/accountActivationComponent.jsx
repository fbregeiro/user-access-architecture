// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';

// Validation
import { accountActivationValidate } from '../../utils/validation';

// Styles and assets
import styles from '../../styles/styles.css';

class AccountActivationComponent extends Component {
	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		return (
			<Form onSubmit={handleSubmit} className={styles.form}>
				<h4>
					Para ativar o seu cadastro, informe o código do convite recebido por
					e-mail
				</h4>
				<div className={styles.field}>
					<h5>Convite:</h5>
					<Field
						type="text"
						component="input"
						placeholder="Convite"
						name="accessCode"
						className={styles.basicinput}
					/>
				</div>
				<div className={styles.field}>
					<h5>E-Mail:</h5>
					<Field
						type="text"
						component="input"
						placeholder="E-Mail"
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

AccountActivationComponent.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

const AccountActivationForm = reduxForm({
	form: 'accountActivationForm',
	validate: accountActivationValidate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(AccountActivationComponent);

export default AccountActivationForm;
