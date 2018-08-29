import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import '../../styles/react-table.scss';

const Table = ({ data, columns, style, headerStyle, ...custom }) => (
	<ReactTable
		style={{ ...styles.table, ...style }}
		data={data}
		columns={columns}
		minRows={0}
		headerStyle={{ ...styles.headerStyle, ...headerStyle }}
		{...custom}
		previousText="Anterior"
		nextText="Próximo"
		loadingText="Carregando..."
		noDataText="Nenhum registro encontrado"
		pageText="Pagina"
		ofText="de"
		rowsText=""
	/>
);

const styles = {
	table: {
		width: '100%',
		minHeight: '155px'
	},
	headerStyle: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white',
		backgroundColor: 'red',
		height: 40
	}
};

Table.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export { Table };
