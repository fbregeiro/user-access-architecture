import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyProfileContainer extends Component {
	render() {
		return <div>My Profile</div>;
	}
}

export default connect(null, null)(MyProfileContainer);
