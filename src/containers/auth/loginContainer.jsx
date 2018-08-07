// React
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import LoginForm from '../../components/auth/loginComponent';

// Styles and assets
import css from './loginContainer.css';
import logo from '../../assets/images/logo.jpeg';
import { UserContext } from '../../context/userContext';

class LoginContainer extends Component {
	render() {
		return (
			<UserContext.Consumer>
				{userContext => (
					<div className={css.loginBox}>
						<div className={css.login}>
							<img src={logo} />
							<LoginForm onSubmit={userContext.performLogin} />
							<div className={css.loginLinksBox}>
								<div className={css.loginLinks}>
									<span>Ainda não possui uma conta?</span>
									<NavLink to="/signup">Cadastre-se.</NavLink>
								</div>
							</div>
							<div className={css.loginLinksBox}>
								<div className={css.loginLinks}>
									<span>Esqueceu a senha?</span>
									<NavLink to="/request-reset-password">
										Reinicie sua senha.
									</NavLink>
								</div>
							</div>
						</div>
					</div>
				)}
			</UserContext.Consumer>
		);
	}
}

const mapActionToProps = {};

export default connect(null, mapActionToProps)(LoginContainer);
