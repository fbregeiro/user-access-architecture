// React
import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';

import customFields from '../common/customFields';
import { createUserByInvitationValidate } from '../../utils/validation';

import styles from '../../styles/styles.css';

function NewUser({ profiles, handleSubmit, pristine, submitting }) {
	return (
		<Form onSubmit={handleSubmit} className={styles.form}>
			<h4>Convidar novo Usuário</h4>
			<div className={styles.field}>
				<Field
					id={1}
					label="Nome Completo"
					name="fullName"
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
			<div className={styles.buttons}>
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

NewUser.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

const NewUserForm = reduxForm({
	form: 'newUserForm',
	validate: createUserByInvitationValidate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(NewUser);

export default NewUserForm;
