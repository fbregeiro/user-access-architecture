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
	componentDidMount() {
		this.props.getProfilesByStatus();
	}

	handleEditProfile(profile) {
		// console.log('profilesContainer', 'handleEditProfile', 'profile', profile);
		this.setState({ selectedProfile: profile });
	}

	render() {
		const { profiles } = this.props;
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
						/>
					</div>
					<div className={[css.column, css.width20].join(' ')}>
						<input type="button" value="Novo Perfil" className={css.button} />
					</div>
				</div>
				<ProfilesComponent
					profiles={profiles || []}
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
