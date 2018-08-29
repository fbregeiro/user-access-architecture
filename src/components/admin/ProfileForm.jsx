// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';

import customFields from '../common/customFields';
import { saveProfileValidate } from '../../utils/validation';

import styles from '../../styles/styles.css';

class ProfileComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sitemaps: null
		};
	}

	render() {
		const { initialValues, handleSubmit, sitemapOptions } = this.props;
		const _subTitle = initialValues
			? 'Verifique e atualize as informações do perfil'
			: 'Informe os dados abaixo para criar um novo perfil';

		return (
			<Form onSubmit={handleSubmit}>
				<h4>{_subTitle}</h4>
				<div>
					<Field
						id={1}
						label="Descrição"
						name="description"
						component={customFields.Input}
					/>
				</div>
				<div>
					<Field
						id={2}
						type="checkbox"
						name="isActive"
						component={customFields.ToggleButton}
						onLabel="Ativo"
						offLabel="Inativo"
						initialValue={initialValues ? initialValues.isActive : true}
					/>
				</div>
				<div>
					<Field
						id={3}
						type="checkbox"
						name="canCreate"
						component={customFields.ToggleButton}
						onLabel="Pode criar"
						offLabel="Não pode criar"
						initialValue={initialValues ? initialValues.canCreate : false}
					/>
				</div>
				<div>
					<Field
						id={4}
						type="checkbox"
						name="canEdit"
						component={customFields.ToggleButton}
						onLabel="Pode editar"
						offLabel="Não pode editar"
						initialValue={initialValues ? initialValues.canEdit : false}
					/>
				</div>
				<div>
					{sitemapOptions && (
						<Field
							id={5}
							component={customFields.PickList}
							name="sitemapIds"
							idFieldName="id"
							descriptionFieldName="title"
							originalList={sitemapOptions || []}
							selectedIds={initialValues ? initialValues.sitemapIds || [] : []}
							sourceHeader="Disponíveis"
							targetHeader="Selecionados"
						/>
					)}
				</div>
				<div className={styles.buttons}>
					<button type="submit" className={styles.basicbutton}>
						<span key={1} className={styles.primaryButtonLabel}>
							Salvar
						</span>
					</button>
				</div>
			</Form>
		);
	}
}

ProfileComponent.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	sitemapOptions: PropTypes.arrayOf(PropTypes.object),
	initialValues: PropTypes.object
};

const ProfileForm = reduxForm({
	form: 'profile-form',
	validate: saveProfileValidate,
	fields: ['description', 'isActive', 'canCreate', 'canEdit'],
	asyncBlurFields: [],
	enableReinitialize: true,
	keepDirtyOnReinitialize: false,
	destroyUnmount: true
})(ProfileComponent);

export default ProfileForm;
