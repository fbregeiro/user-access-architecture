// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';

// Validation
import { passwordActivationValidate } from '../../utils/validation';

// Styles and assets
import styles from '../../styles/styles.css';
import css from './passwordActivationComponent.css';

class PasswordActivationComponent extends Component {
	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		return (
			<Form onSubmit={handleSubmit} className={css.form}>
				<h4>
					Entre com o código recebido por email, digite e confirme a sua nova
					senha
				</h4>
				<div className={css.field}>
					<h5>Código:</h5>
					<Field
						type="text"
						component="input"
						placeholder="Código"
						name="token"
						className={styles.basicinput}
					/>
				</div>
				<div className={css.field}>
					<h5>Senha:</h5>
					<Field
						type="password"
						component="input"
						placeholder="Senha"
						name="password"
						className={styles.basicinput}
					/>
				</div>
				<div className={css.field}>
					<h5>Confirmação de Senha:</h5>
					<Field
						type="password"
						component="input"
						placeholder="Confirmação de Senha"
						name="passwordConfirmation"
						className={styles.basicinput}
					/>
				</div>
				<div className={css.field}>
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

PasswordActivationComponent.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

const PasswordActivationForm = reduxForm({
	form: 'passwordActivationForm',
	validate: passwordActivationValidate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(PasswordActivationComponent);

export default PasswordActivationForm;
