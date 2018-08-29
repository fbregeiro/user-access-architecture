import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../common/Table';
import { CustomButton } from '../common';

const UsersList = props => {
	const columns = [
		{
			Header: 'Nome',
			accessor: 'fullName', // String-based value accessors!
			headerStyle: styles.headerStyle,
			style: styles.bodyStyle,
			minWidth: 150
		},
		{
			Header: 'E-mail',
			accessor: 'email',
			headerStyle: styles.headerStyle,
			style: styles.bodyStyle,
			minWidth: 150
		},
		{
			id: 'profile', // Required because our accessor is not a string
			Header: 'Perfil',
			accessor: d => d.profile.description, // Custom value accessors!
			headerStyle: styles.headerStyle,
			style: styles.bodyStyle
		},
		{
			Header: '',
			accessor: 'id',
			Cell: x => (
				<CustomButton
					style={styles.iconStyle}
					onClick={e => props.editClick(e, x.value)}>
					Editar
				</CustomButton>
			),
			headerStyle: styles.headerStyle,
			maxWidth: 60
		}
	];

	return <Table columns={columns} data={props.data} />;
};

const styles = {
	headerStyle: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		color: 'white',
		backgroundColor: 'grey',
		textTransform: 'uppercase',
		height: 40
	},
	bodyStyle: {
		display: 'flex',
		alignItems: 'center',
		height: 40
	},
	iconStyle: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer'
	}
};

UsersList.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	editClick: PropTypes.func.isRequired
};

export default UsersList;
