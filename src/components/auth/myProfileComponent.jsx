// React
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';
import Toggle from 'react-toggle';

// Validation
import { saveMyProfileValidate } from '../../utils/validation';

// Styles and assets
import styles from '../../styles/styles.css';
import css from './myProfileComponent.css';

export const renderToggleInput = field => (
	<Toggle
		checked={field.input.value}
		onChange={field.input.onChange}
		icons={false}
	/>
);

function MyProfileComponent({ user, handleSubmit, pristine, submitting }) {
	return (
		<Form onSubmit={handleSubmit} className={css.form}>
			<h4>Meu Perfil</h4>
			<div className={css.field}>
				<h5>Nome:</h5>
				<Field
					type="text"
					component="input"
					placeholder="Nome Completo"
					name="fullName"
					className={styles.basicinput}
				/>
			</div>
			<div className={css.field}>
				<h5>Documento:</h5>
				<Field
					type="text"
					component="input"
					placeholder="Documento"
					name="documentNumber"
					className={styles.basicinput}
				/>
			</div>
			<h5>Perfil: {user.profile.description}</h5>
			{/* <div classNamwe={css.field}>
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
			</div> */}
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

MyProfileComponent.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

const MyProfileForm = reduxForm({
	form: 'myProfileForm',
	validate: saveMyProfileValidate,
	enableReinitialize: true,
	asyncBlurFields: [],
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(MyProfileComponent);

const mapStateToProps = (state, ownProps) => ({
	initialValues: {
		fullName: ownProps.user.fullName,
		documentNumber: ownProps.user.documentNumber
	},
	dummy_variable_to_avoid_commit_rule_of_unused_var_for_state: state.blablabla
});

export default connect(mapStateToProps, null)(
	reduxForm({ form: 'myProfileForm' })(MyProfileForm)
);
