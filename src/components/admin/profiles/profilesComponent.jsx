import React from 'react';
import PropTypes from 'prop-types';

//import css from './profilesComponent.css';
import styles from '../../../styles/styles.css';

function ProfilesComponent({ profiles, handleEditProfile }) {
	return (
		<table id="t" className={styles.basictable}>
			<thead>
				<tr>
					<th>Nome</th>
					<th>Acesso de Criação</th>
					<th>Acesso de Edição</th>
					<th>Protegido pelo Sistema</th>
					<th>Status</th>
					<th>Ações</th>
				</tr>
			</thead>
			<tbody>
				{profiles.map(profile => (
					<tr key={profile.description}>
						<td>{profile.description}</td>
						<td>{profile.canCreate ? 'Sim' : 'Não'}</td>
						<td>{profile.canEdit ? 'Sim' : 'Não'}</td>
						<td>{profile.isSystemProtected ? 'Sim' : 'Não'}</td>
						<td>{profile.isActive ? 'Ativo' : 'Inativo'}</td>
						<td>
							<button
								onClick={() => handleEditProfile(profile)}
								className={styles.basicbutton}>
								Editar
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

ProfilesComponent.proptTypes = {
	users: PropTypes.array.isRequired
};

export default ProfilesComponent;
