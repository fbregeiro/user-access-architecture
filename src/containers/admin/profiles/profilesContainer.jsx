import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfilesComponent from '../../../components/admin/profiles/profilesComponent';
import NewProfileForm from '../../../components/admin/profiles/newProfileComponent';
import EditProfileForm from '../../../components/admin/profiles/editProfileComponent';

import {
	getProfilesByStatus,
	createProfile,
	updateProfile
} from '../../../actions/profileActions';

import css from './profilesContainer.css';

class ProfilesContainer extends Component {
	constructor(props) {
		super(props);
		this.handleEditProfile = this.handleEditProfile.bind(this);
		this.handleSaveNewProfile = this.handleSaveNewProfile.bind(this);
		this.handleChangeFilter = this.handleChangeFilter.bind(this);
		this.handleSaveExistingProfile = this.handleSaveExistingProfile.bind(this);

		this.state = {
			selectedProfile: {},
			profilesFilteredList: this.props.profiles
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

	handleChangeFilter(event) {
		var filterValue = event ? event.target.value : '';
		var filteredList = this.props.profiles;
		filteredList = filteredList.filter(
			profile =>
				profile.description.toLowerCase().indexOf(filterValue.toLowerCase()) >
				-1
		);
		this.setState({ profilesFilteredList: filteredList });
	}

	handleShowNewProfileModal() {
		window.location.hash = '#open-new-profile-modal';
	}

	handleEditProfile(profile) {
		// console.log('profilesContainer', 'handleEditProfile', 'profile', profile);
		window.location.hash = '#open-edit-profile-modal';
		this.setState({ selectedProfile: profile });
	}

	handleSaveNewProfile(profile) {
		this.props.createProfile(profile).then(() => {
			this.getProfiles();
			window.location.hash = '#modal-close';
		});
	}

	handleSaveExistingProfile(profile) {
		this.props.updateProfile(profile).then(() => {
			this.getProfiles();
			window.location.hash = '#modal-close';
		});
	}

	render() {
		return (
			<div>
				<h3>Gestão de Perfis</h3>
				<h5>Administre os perfis atuais ou crie novos perfis.</h5>
				<div className={css.header}>
					<div className={[css.column, css.width80].join(' ')}>
						<input
							type="text"
							placeholder="Filtro por coincidência"
							name="filter"
							className={css.input}
							onChange={this.handleChangeFilter}
						/>
					</div>
					<div className={[css.column, css.width20].join(' ')}>
						<input
							type="button"
							value="Novo perfil"
							className={css.button}
							onClick={this.handleShowNewProfileModal}
						/>
					</div>
				</div>
				<ProfilesComponent
					profiles={this.state.profilesFilteredList || []}
					handleEditProfile={this.handleEditProfile}
				/>
				<div id="open-edit-profile-modal" className={css['modal-window']}>
					<div>
						<a href="#modal-close" title="Close" className={css['modal-close']}>
							X
						</a>
						<div>
							<EditProfileForm
								profile={this.state.selectedProfile}
								onSubmit={this.handleSaveExistingProfile}
							/>
						</div>
					</div>
				</div>
				<div id="open-new-profile-modal" className={css['modal-window']}>
					<div>
						<a href="#modal-close" title="Close" className={css['modal-close']}>
							X
						</a>
						<div>
							<NewProfileForm onSubmit={this.handleSaveNewProfile} />
						</div>
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
	getProfilesByStatus,
	createProfile,
	updateProfile
};

export default connect(mapStateToProps, mapActionToProps)(ProfilesContainer);
