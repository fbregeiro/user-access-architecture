// React
import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../store/history';

// Actions
import { createUserByInvitation } from '../../actions/userActions';

// Components
import AccountActivationForm from '../../components/auth/accountActivationComponent';

// Styles and assets
import css from './accountActivationContainer.css';

class AccountActivationContainer extends Component {
	handleCreateUserByInvitation = values => {
		const { accessCode, email, password } = values;
		this.props
			.createUserByInvitation({
				accessCode: accessCode,
				token: email,
				password: password
			})
			.then(() => {
				history.push('/');
			});
	};

	render() {
		return (
			<div className={css.formBox}>
				<div className={css.form}>
					<AccountActivationForm onSubmit={this.handleCreateUserByInvitation} />
				</div>
			</div>
		);
	}
}

const mapActionToProps = {
	createUserByInvitation
};

export default connect(null, mapActionToProps)(AccountActivationContainer);
