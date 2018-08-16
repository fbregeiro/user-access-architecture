// React
import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../store/history';

// Actions
import { changeUserPassword } from '../../actions/authenticationActions';

// Components
import PasswordActivationForm from '../../components/auth/passwordActivationComponent';

// Styles and assets
import css from './passwordActivationContainer.css';

class PasswordActivationContainer extends Component {
	handleChangePassword = values => {
		const { token, password } = values;
		this.props
			.changeUserPassword({ token: token, password: password })
			.then(() => {
				history.push('/');
			});
	};

	render() {
		return (
			<div className={css.formBox}>
				<div className={css.form}>
					<PasswordActivationForm onSubmit={this.handleChangePassword} />
				</div>
			</div>
		);
	}
}

const mapActionToProps = {
	changeUserPassword
};

export default connect(null, mapActionToProps)(PasswordActivationContainer);
