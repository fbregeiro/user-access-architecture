// React
import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';

import customFields from '../common/customFields';
import { saveUserValidate } from '../../utils/validation';

import styles from '../../styles/styles.css';

const UserComponent = props => {
	const { initialValues, profiles, handleSubmit } = props;
	const _subTitle = initialValues
		? 'Verifique e atualize as informações do usuário'
		: 'Informe os dados abaixo para convidar um novo usuário';

	return (
		<Form onSubmit={handleSubmit}>
			<h4>{_subTitle}</h4>
			{initialValues && (
				<div>
					<span>{initialValues.fullName}</span>
				</div>
			)}
			{!initialValues && (
				<div>
					<Field
						id={1}
						label="Nome Completo"
						name="fullName"
						component={customFields.Input}
					/>
				</div>
			)}
			{!initialValues && (
				<div>
					<Field
						id={2}
						label="E-mail"
						name="email"
						autoComplete="email"
						component={customFields.Input}
					/>
				</div>
			)}
			<div>
				<Field
					id={3}
					type="select"
					name="profileId"
					model="id"
					component={customFields.DropDown}
					options={profiles}
					value={initialValues ? initialValues.id : ''}
					placeholder="Selecione um Perfil"
					optionLabel="description"
				/>
			</div>
			{initialValues && (
				<div>
					<Field
						id={4}
						type="checkbox"
						name="isActive"
						model="isActive"
						initialValue={initialValues.isActive}
						component={customFields.ToggleButton}
						onLabel="Ativo"
						offLabel="Inativo"
					/>
				</div>
			)}
			<div className={styles.buttons}>
				<button type="submit" className={styles.basicbutton}>
					Salvar
				</button>
			</div>
		</Form>
	);
};

UserComponent.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	profiles: PropTypes.arrayOf(PropTypes.object),
	initialValues: PropTypes.object
};

const UserForm = reduxForm({
	form: 'user-form',
	validate: saveUserValidate,
	fields: ['fullName', 'isActive', 'profileId'],
	asyncBlurFields: [],
	enableReinitialize: true,
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(UserComponent);

export default UserForm;
