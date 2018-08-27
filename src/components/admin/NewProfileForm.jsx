// React
import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';
import Toggle from 'react-toggle';

import customFields from '../common/customFields';
import { createProfileValidate } from '../../utils/validation';

import styles from '../../styles/styles.css';

export const renderToggleInput = field => (
	<Toggle
		checked={field.input.value}
		onChange={field.input.onChange}
		icons={false}
	/>
);

function NewProfile({ sitemapOptions, handleSubmit, pristine, submitting }) {
	return (
		<Form onSubmit={handleSubmit} className={styles.form}>
			<h4>Criar novo perfil</h4>
			<div className={styles.field}>
				<Field
					id={1}
					label="Descrição"
					name="description"
					component={customFields.Input}
				/>
			</div>
			<div className={styles.field}>
				<h5>Status:</h5>
				<Field name="isActive" id="isActive" component={renderToggleInput} />
			</div>
			<div className={styles.field}>
				<h5>Pode criar:</h5>
				<Field name="canCreate" id="canCreate" component={renderToggleInput} />
			</div>
			<div className={styles.field}>
				<h5>Pode editar:</h5>
				<Field name="canEdit" id="canEdit" component={renderToggleInput} />
			</div>
			<div className={styles.field}>
				<h5>Sitemaps:</h5>
				<Field name="sitemapIds" component="select" multiple={true}>
					<option value="" />
					{sitemapOptions.map(sitemapOption => (
						<option key={sitemapOption.id} value={sitemapOption.id}>
							{sitemapOption.title}
						</option>
					))}
				</Field>
			</div>
			<div className={styles.buttons}>
				<button
					type="submit"
					disabled={pristine || submitting}
					className={styles.basicbutton}>
					<span key={1} className={styles.primaryButtonLabel}>
						Salvar
					</span>
				</button>
			</div>
		</Form>
	);
}

NewProfile.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

const NewProfileForm = reduxForm({
	form: 'newProfileForm',
	validate: createProfileValidate,
	initialValues: { sitemapIds: [] },
	enableReinitialize: true,
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(NewProfile);

export default NewProfileForm;
