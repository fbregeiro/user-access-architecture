// React
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../store/history';

// Components
import LoginForm from '../../components/auth/loginComponent';

import { userLogin } from '../../actions/authenticationActions';

// Styles and assets
import css from './loginContainer.css';

class LoginContainer extends Component {
	handleUserLogin = values => {
		this.props.userLogin(values).then(() => {
			history.push('/dashboard');
		});
	};
	render() {
		return (
			<div className={css.formBox}>
				<div className={css.form}>
					<LoginForm onSubmit={this.handleUserLogin} />
					<div className={css.linksBox}>
						<div className={css.links}>
							<span>Esqueceu a senha?</span>
							<NavLink to="/reset-password">Reinicie sua senha.</NavLink>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapActionToProps = {
	userLogin
};

export default connect(null, mapActionToProps)(LoginContainer);
