// React
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';
import Toggle from 'react-toggle';

// Validation
import { updateUserValidate } from '../../../utils/validation';

// Styles and assets
import styles from '../../../styles/styles.css';
import css from './editUserComponent.css';

export const renderToggleInput = field => (
	<Toggle
		checked={field.input.value}
		onChange={field.input.onChange}
		icons={false}
	/>
);

function EditUserComponent({
	user,
	profiles,
	handleSubmit,
	pristine,
	submitting
}) {
	return (
		<Form onSubmit={handleSubmit} className={css.form}>
			<h4>Editar Usuário</h4>
			<h5>{user.fullName}</h5>
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
				<h5>Status:</h5>
				<Field name="isActive" id="isActive" component={renderToggleInput} />
			</div>
			<div className={css.field}>
				<button
					type="submit"
					disabled={pristine || submitting}
					className={styles.primaryButton}>
					<span key={1} className={styles.primaryButtonLabel}>
						Salvar
					</span>
				</button>
			</div>
		</Form>
	);
}

EditUserComponent.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

const EditUserForm = reduxForm({
	form: 'editUserForm',
	validate: updateUserValidate,
	enableReinitialize: true,
	asyncBlurFields: [],
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(EditUserComponent);

const mapStateToProps = ownProps => ({
	initialValues: {
		profileId: ownProps.user.profileId,
		isActive: ownProps.user.isActive
	}
});

export default connect(mapStateToProps, null)(
	reduxForm({ form: 'editUserForm' })(EditUserForm)
);
