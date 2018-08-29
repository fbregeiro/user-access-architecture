import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CustomButton } from '../../components/common';
import UsersList from '../../components/admin/UsersList';
import tab from './tab.css';

import { getUsersByStatus } from '../../actions/userActions';
import UserContainer from './UserContainer';

import css from './Users.css';

class Users extends Component {
	constructor(props) {
		super(props);
		this.handleShowNewUserModal = this.handleShowNewUserModal.bind(this);
		this.handleShowEditUserModal = this.handleShowEditUserModal.bind(this);
		this.handleHideUserModal = this.handleHideUserModal.bind(this);
		this.handleOnSubmitUser = this.handleOnSubmitUser.bind(this);

		this.state = {
			usersFilteredList: this.props.users,
			selectedUser: {},
			showUserModal: false
		};
	}

	getUsers() {
		this.props.getUsersByStatus().then(() => {
			this.setState({ usersFilteredList: this.props.users });
		});
	}

	componentDidMount() {
		this.getUsers();
	}

	handleShowNewUserModal() {
		this.setState({ selectedUser: null });
		this.setState({ showUserModal: true });
		window.location.hash = '#open-user-modal';
	}

	// eslint-disable-next-line
	handleEditClick = (e, id) => {
		let user = this.props.users.find(item => item.id === id);
		this.handleShowEditUserModal(user);
	};

	handleShowEditUserModal(user) {
		this.setState({
			selectedUser: {
				id: user.id,
				email: user.email,
				fullName: user.fullName,
				profileId: user.profileId,
				isActive: user.isActive
			}
		});
		this.setState({ showUserModal: true });
		window.location.hash = '#open-user-modal';
	}

	handleHideUserModal() {
		this.setState({ selectedUser: null });
		this.setState({ showUserModal: false });
		window.location.hash = '#modal-close';
	}

	handleOnSubmitUser() {
		this.getUsers();
		this.handleHideUserModal();
	}

	render() {
		return (
			<div>
				<div className={tab.tabHeader}>
					<div className={tab.titleContainer}>
						<h2>Gestão de usuários</h2>
						<h3>
							Administre os usuários atuais e convide novos usuários para a
							plataforma.
						</h3>
					</div>
					<div className={tab.primaryActionContainer}>
						<CustomButton onClick={this.handleShowNewUserModal}>
							Convidar usuário
						</CustomButton>
					</div>
				</div>
				<div className={tab.grid}>
					<UsersList
						data={this.state.usersFilteredList || []}
						editClick={this.handleEditClick}
					/>
				</div>
				<div id="open-user-modal" className={css['modal-window']}>
					<div>
						<a href="#modal-close" title="Close" className={css['modal-close']}>
							X
						</a>
						{this.state.showUserModal && (
							<div>
								<UserContainer
									user={this.state.selectedUser}
									onSubmit={this.handleOnSubmitUser}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	users: state.admin.users
});

const mapActionToProps = {
	getUsersByStatus
};

export default connect(mapStateToProps, mapActionToProps)(Users);
