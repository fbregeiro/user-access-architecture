import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../../components/common/Loader';
import Header from '../../components/common/Header';

const spinner = {
	color: '#000',
	size: 30,
	verticalAlign: 'center',
	className: 'loading'
};

const HeaderContainer = props => (
	<div>
		<Loader id="spinner" {...spinner} loading={props.isFetching} />
		<Header />
	</div>
);

Header.propTypes = {
	isFetching: PropTypes.bool.isRequired
};

export default HeaderContainer;
