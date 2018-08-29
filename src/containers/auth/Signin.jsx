// React
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import SigninForm from '../../components/auth/SigninForm';
import { userLogin } from '../../actions/authenticationActions';

import css from './Signin.css';

class Signin extends Component {
	handleSignin = async values => {
		const { history, userLogin } = this.props;
		await userLogin(values);
		if (this.props.userData.isAuthenticated) {
			history.push('/dashboard');
		}
	};

	render() {
		return (
			<div className={css.formBox}>
				<div className={css.form}>
					<SigninForm onSubmit={this.handleSignin} />
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

const mapStateToProps = (state, ownProps) => ({
	userData: state.auth,
	history: ownProps.history
});

const mapActionToProps = {
	userLogin
};

export default connect(mapStateToProps, mapActionToProps)(Signin);
