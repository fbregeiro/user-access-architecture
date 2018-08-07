import React, { Component } from 'react';
import { connect } from 'react-redux';

class UsersContainer extends Component {
	render() {
		return <div>Users administration</div>;
	}
}

export default connect(null, null)(UsersContainer);
