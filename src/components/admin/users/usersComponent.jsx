import React from 'react';
import PropTypes from 'prop-types';

//import css from './usersComponent.css';

function UsersComponent({ users, handleEditUser }) {
	return (
		<table id="t">
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
							<button onClick={() => handleEditUser(user)}>Editar</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

UsersComponent.proptTypes = {
	users: PropTypes.array.isRequired
};

export default UsersComponent;
