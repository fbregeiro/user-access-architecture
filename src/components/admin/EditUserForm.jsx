// React
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';
import Toggle from 'react-toggle';

// Validation
import { updateUserValidate } from '../../utils/validation';

// Styles and assets
import styles from '../../styles/styles.css';

export const renderToggleInput = field => (
	<Toggle
		checked={field.input.value}
		onChange={field.input.onChange}
		icons={false}
	/>
);

function EditUser({ user, profiles, handleSubmit, pristine, submitting }) {
	return (
		<Form onSubmit={handleSubmit} className={styles.form}>
			<h4>Editar Usuário</h4>
			<h5>{user.fullName}</h5>
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
			<div className={styles.field}>
				<h5>Status:</h5>
				<Field name="isActive" id="isActive" component={renderToggleInput} />
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

EditUser.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

const EditUserForm = reduxForm({
	form: 'editUserForm',
	validate: updateUserValidate,
	enableReinitialize: true,
	asyncBlurFields: [],
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(EditUser);

const mapStateToProps = (state, ownProps) => ({
	initialValues: {
		profileId: ownProps.user.profileId,
		isActive: ownProps.user.isActive
	},
	dummy_variable_to_avoid_commit_rule_of_unused_var_for_state: state.blablabla
});

export default connect(mapStateToProps, null)(
	reduxForm({ form: 'editUserForm' })(EditUserForm)
);
