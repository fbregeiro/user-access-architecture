import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/styles.css';

function UsersList({ users, handleEditUser }) {
	return (
		<table id="t" className={styles.basictable}>
			<thead>
				<tr>
					<th>Nome</th>
					<th>E-Mail</th>
					<th>Documento</th>
					<th>Perfil</th>
					<th>Status</th>
					<th>Ações</th>
				</tr>
			</thead>
			<tbody>
				{users.map(user => (
					<tr key={user.id}>
						<td>{user.fullName}</td>
						<td>{user.email}</td>
						<td>{user.documentNumber}</td>
						<td>{user.profile.description}</td>
						<td>{user.isActive ? 'Ativo' : 'Inativo'}</td>
						<td>
							<button
								onClick={() => handleEditUser(user)}
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

UsersList.proptTypes = {
	users: PropTypes.array.isRequired
};

export default UsersList;
