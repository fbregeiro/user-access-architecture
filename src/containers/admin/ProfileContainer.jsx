// React
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createProfile, updateProfile } from '../../actions/profileActions';
import { getSitemapsOptions } from '../../actions/utilsActions';

import ProfileForm from '../../components/admin/ProfileForm';

class ProfileContainer extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getSitemapsOptions(true);
	}

	handleSubmit = async profile => {
		if (profile.id === null) {
			await this.props.createProfile(profile);
		} else {
			await this.props.updateProfile(profile);
		}
		this.props.onSubmit();
	};

	render() {
		const { profile } = this.props;
		return (
			<div>
				<ProfileForm
					initialValues={profile}
					sitemapOptions={this.props.sitemapOptions}
					onSubmit={this.handleSubmit}
				/>
			</div>
		);
	}
}

ProfileContainer.propTypes = {
	profile: PropTypes.object,
	onSubmit: PropTypes.func.isRequired
};

//eslint-disable-next-line
const mapStateToProps = (state, ownProps) => ({
	sitemapOptions: state.admin.sitemapOptions
});

const mapActionToProps = {
	createProfile,
	updateProfile,
	getSitemapsOptions
};

export default connect(mapStateToProps, mapActionToProps)(ProfileContainer);
