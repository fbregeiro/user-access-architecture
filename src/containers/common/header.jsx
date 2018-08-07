import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../../components/common/loader';
import MenuComponent from '../../components/common/menuComponent';

const spinner = {
	color: '#000',
	size: 30,
	verticalAlign: 'center',
	className: 'loading'
};

const HeaderPage = props => (
	<div>
		<MenuComponent />
		<Loader id="spinner" {...spinner} loading={props.isFetching} />
	</div>
);

HeaderPage.propTypes = {
	isFetching: PropTypes.bool.isRequired
};

export default HeaderPage;
