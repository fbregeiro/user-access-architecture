import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CustomButton } from '../../components/common';
import ProfilesList from '../../components/admin/ProfilesList';
import tab from './tab.css';

import { getProfilesByStatus } from '../../actions/profileActions';
import ProfileContainer from './ProfileContainer';

import css from './Profiles.css';

class Profiles extends Component {
	constructor(props) {
		super(props);
		this.handleShowNewProfileModal = this.handleShowNewProfileModal.bind(this);
		this.handleShowEditProfileModal = this.handleShowEditProfileModal.bind(
			this
		);
		this.handleHideProfileModal = this.handleHideProfileModal.bind(this);
		this.handleOnSubmitProfile = this.handleOnSubmitProfile.bind(this);

		this.state = {
			selectedProfile: {},
			profilesFilteredList: this.props.profiles,
			showProfileModal: false
		};
	}

	componentDidMount() {
		this.getProfiles();
	}

	getProfiles() {
		this.props.getProfilesByStatus().then(() => {
			this.setState({ profilesFilteredList: this.props.profiles });
		});
	}

	// eslint-disable-next-line
	handleShowNewProfileModal = e => {
		this.setState({
			selectedProfile: {
				id: null,
				description: null,
				isActive: true,
				canCreate: false,
				canEdit: false,
				sitemapIds: []
			}
		});
		this.setState({ showProfileModal: true });
		window.location.hash = '#open-profile-modal';
	};

	// eslint-disable-next-line
	handleEditClick = (e, id) => {
		let profile = this.props.profiles.find(item => item.id === id);
		this.handleShowEditProfileModal(profile);
	};

	handleShowEditProfileModal(profile) {
		this.setState({ selectedProfile: profile });
		this.setState({ showProfileModal: true });
		window.location.hash = '#open-profile-modal';
	}

	handleHideProfileModal() {
		this.setState({ selectedProfile: null });
		this.setState({ showProfileModal: false });
		window.location.hash = '#modal-close';
	}

	handleOnSubmitProfile() {
		this.getProfiles();
		this.handleHideProfileModal();
	}

	render() {
		const { profiles } = this.props;

		return (
			<div>
				<div className={tab.tabHeader}>
					<div className={tab.titleContainer}>
						<h2>Gestão de perfis</h2>
						<h3>Administre os perfis atuais e crie novos perfis.</h3>
					</div>
					<div className={tab.primaryActionContainer}>
						<CustomButton onClick={this.handleShowNewProfileModal}>
							Criar perfil
						</CustomButton>
					</div>
				</div>

				<div className={tab.grid}>
					<ProfilesList data={profiles} editClick={this.handleEditClick} />
				</div>
				<div id="open-profile-modal" className={css['modal-window']}>
					<div>
						<a href="#modal-close" title="Close" className={css['modal-close']}>
							X
						</a>
						{this.state.showProfileModal && (
							<div>
								<ProfileContainer
									profile={this.state.selectedProfile}
									onSubmit={this.handleOnSubmitProfile}
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
	profiles: state.admin.profiles
});

const mapActionToProps = {
	getProfilesByStatus
};

export default connect(mapStateToProps, mapActionToProps)(Profiles);
