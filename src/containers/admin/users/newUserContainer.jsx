import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewUserContainer extends Component {
	render() {
		return <div>Novo Usuário</div>;
	}
}

export default connect(null, null)(NewUserContainer);
