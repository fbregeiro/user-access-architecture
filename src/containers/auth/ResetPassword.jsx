// React
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../store/history';

// Actions
import { resetUserPassword } from '../../actions/authenticationActions';

// Components
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

// Styles and assets
import css from './ResetPassword.css';

class ResetPassword extends Component {
	handleResetPassword = email => {
		this.props.resetUserPassword(email).then(() => {
			history.push('/');
		});
	};

	render() {
		return (
			<div className={css.formBox}>
				<div className={css.form}>
					<ResetPasswordForm onSubmit={this.handleResetPassword} />
					<div className={css.linksBox}>
						<div className={css.links}>
							<span>Lembrou a Senha?</span>
							<NavLink to="/login">Entrar</NavLink>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapActionToProps = {
	resetUserPassword
};

export default connect(null, mapActionToProps)(ResetPassword);
