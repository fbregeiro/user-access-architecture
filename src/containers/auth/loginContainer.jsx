// React
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import LoginForm from '../../components/auth/loginComponent';

// Styles and assets
import css from './loginContainer.css';
import { UserContext } from '../../context/userContext';

class LoginContainer extends Component {
	render() {
		return (
			<UserContext.Consumer>
				{userContext => (
					<div className={css.formBox}>
						<div className={css.form}>
							<LoginForm onSubmit={userContext.performLogin} />
							<div className={css.linksBox}>
								<div className={css.links}>
									<span>Esqueceu a senha?</span>
									<NavLink to="/reset-password">Reinicie sua senha.</NavLink>
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
