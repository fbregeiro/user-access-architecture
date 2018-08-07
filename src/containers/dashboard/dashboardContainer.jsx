import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserContext } from '../../context/userContext';

class DashboardContainer extends Component {
	render() {
		return (
			<UserContext.Consumer>
				{userContext => <div>Bem vindo, {userContext.user.fullName}!</div>}
			</UserContext.Consumer>
		);
	}
}

export default connect(null, null)(DashboardContainer);
