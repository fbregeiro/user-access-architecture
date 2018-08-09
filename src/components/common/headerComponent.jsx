import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

import css from './headerComponent.css';

export default function HeaderComponent() {
	return (
		<UserContext.Consumer>
			{({ user, performLogout }) => (
				<div className={css.header}>
					<div className={css.logo}>
						<Link to="/">
							<img src={require('../../assets/images/logo.jpeg')} />
						</Link>
					</div>
					{user && (
						<div className={css.user}>
							{user && 'Bem vindo, ' + user.fullName}!
							<br />
							<a href="#" onClick={performLogout}>
								Sair
							</a>
						</div>
					)}
					{!user && (
						<div className={css.user}>
							<Link to="/login">Entrar</Link>
						</div>
					)}
				</div>
			)}
		</UserContext.Consumer>
	);
}
