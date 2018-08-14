import React, { Component } from 'react';
import { connect } from 'react-redux';

import UsersComponent from '../../../components/admin/users/usersComponent';
import NewUserForm from '../../../components/admin/users/newUserComponent';
import EditUserForm from '../../../components/admin/users/editUserComponent';

import {
	getUsersByStatus,
	createUserByInvitation,
	updateUser
} from '../../../actions/userActions';

import { getProfilesByStatus } from '../../../actions/profileActions';

import css from './usersContainer.css';
import styles from '../../../styles/styles.css';

class UsersContainer extends Component {
	constructor(props) {
		super(props);
		this.handleEditUser = this.handleEditUser.bind(this);
		this.handleSaveNewUser = this.handleSaveNewUser.bind(this);
		this.handleSaveExistingUser = this.handleSaveExistingUser.bind(this);

		this.state = {
			selectedUser: {}
		};
		this.props.getProfilesByStatus(true);
	}
	componentDidMount() {
		this.props.getUsersByStatus();
	}

	handleShowNewUserModal() {
		window.location.hash = '#open-new-user-modal';
	}

	handleEditUser(user) {
		this.setState({ selectedUser: user });
		window.location.hash = '#open-edit-user-modal';
	}

	handleSaveNewUser(user) {
		this.props.createUserByInvitation(user).then(() => {
			this.props.getUsersByStatus();
			window.location.hash = '#modal-close';
		});
	}

	handleSaveExistingUser(user) {
		this.props.updateUser(user).then(() => {
			this.props.getUsersByStatus();
			window.location.hash = '#modal-close';
		});
	}

	render() {
		const { users, profiles } = this.props;
		return (
			<div>
				<h3>Gestão de Usuários</h3>
				<h5>
					Administre os usuários atuais e convide novos usuários para a
					plataforma.
				</h5>
				<div className={css.header}>
					<div className={[css.column, css.width80].join(' ')}>
						<input
							type="text"
							placeholder="Filtro por coincidência"
							name="filter"
							className={styles.basicinput}
						/>
					</div>
					<div className={[css.column, css.width20].join(' ')}>
						<button
							onClick={this.handleShowNewUserModal}
							className={styles.basicbutton}>
							Convidar Usuário
						</button>
					</div>
				</div>
				<UsersComponent
					users={users || []}
					handleEditUser={this.handleEditUser}
				/>
				<div id="open-edit-user-modal" className={css['modal-window']}>
					<div>
						<a href="#modal-close" title="Close" className={css['modal-close']}>
							X
						</a>
						<div>
							<EditUserForm
								user={this.state.selectedUser}
								profiles={profiles || []}
								onSubmit={this.handleSaveExistingUser}
							/>
						</div>
					</div>
				</div>
				<div id="open-new-user-modal" className={css['modal-window']}>
					<div>
						<a href="#modal-close" title="Close" className={css['modal-close']}>
							X
						</a>
						<div>
							<NewUserForm
								profiles={profiles}
								onSubmit={this.handleSaveNewUser}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	users: state.admin.users,
	profiles: state.admin.profiles
});

const mapActionToProps = {
	getUsersByStatus,
	createUserByInvitation,
	updateUser,
	getProfilesByStatus
};

export default connect(mapStateToProps, mapActionToProps)(UsersContainer);
