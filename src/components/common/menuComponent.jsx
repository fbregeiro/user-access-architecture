import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

function MenuComponent() {
	return (
		<UserContext.Consumer>
			{({ performLogout }) => (
				<div>
					<NavLink to="/dashboard">Dashboard</NavLink>
					<NavLink to="/users">Usuários</NavLink>
					<a href="#" onClick={performLogout}>
						Sair
					</a>
				</div>
			)}
		</UserContext.Consumer>
	);
}

export default MenuComponent;
