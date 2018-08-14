// React
import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';

// Validation
import { createUserByInvitationValidate } from '../../../utils/validation';

// Styles and assets
import styles from '../../../styles/styles.css';
import css from './newUserComponent.css';

function NewUserComponent({ profiles, handleSubmit, pristine, submitting }) {
	return (
		<Form onSubmit={handleSubmit} className={css.form}>
			<h4>Convidar novo Usuário</h4>
			<div className={css.field}>
				<h5>Nome Completo:</h5>
				<Field
					type="text"
					component="input"
					placeholder="Nome Completo"
					name="fullName"
					className={styles.basicinput}
				/>
			</div>
			<div className={css.field}>
				<h5>E-Mail:</h5>
				<Field
					type="text"
					component="input"
					placeholder="E-mail"
					name="email"
					className={styles.basicinput}
				/>
			</div>
			<div className={css.field}>
				<h5>Perfil:</h5>
				<Field name="profileId" component="select">
					<option value="" />
					{profiles.map(profile => (
						<option key={profile.id} value={profile.id}>
							{profile.description}
						</option>
					))}
				</Field>
			</div>
			<div className={css.field}>
				<button
					type="submit"
					disabled={pristine || submitting}
					className={styles.basicbutton}>
					Salvar
				</button>
			</div>
		</Form>
	);
}

NewUserComponent.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

const NewUserForm = reduxForm({
	form: 'newUserForm',
	validate: createUserByInvitationValidate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(NewUserComponent);

export default NewUserForm;
