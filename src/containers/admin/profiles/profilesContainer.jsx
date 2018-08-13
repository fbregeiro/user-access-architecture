import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfilesComponent from '../../../components/admin/profiles/profilesComponent';

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
		this.handleChangeFilter = this.handleChangeFilter.bind(this);

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

	handleEditProfile(profile) {
		// console.log('profilesContainer', 'handleEditProfile', 'profile', profile);
		this.setState({ selectedProfile: profile });
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
						<input type="button" value="Novo Perfil" className={css.button} />
					</div>
				</div>
				<ProfilesComponent
					profiles={this.state.profilesFilteredList || []}
					handleEditProfile={this.handleEditProfile}
				/>
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
