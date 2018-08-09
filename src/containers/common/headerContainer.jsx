import React from 'react';
import PropTypes from 'prop-types';

import LoaderComponent from '../../components/common/loaderComponent';
import HeaderComponent from '../../components/common/headerComponent';

const spinner = {
	color: '#000',
	size: 30,
	verticalAlign: 'center',
	className: 'loading'
};

const HeaderPage = props => (
	<div>
		<LoaderComponent id="spinner" {...spinner} loading={props.isFetching} />
		<HeaderComponent />
	</div>
);

HeaderPage.propTypes = {
	isFetching: PropTypes.bool.isRequired
};

export default HeaderPage;
