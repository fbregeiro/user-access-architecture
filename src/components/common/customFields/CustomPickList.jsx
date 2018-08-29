import React from 'react';
import PropTypes from 'prop-types';

const inputStyle = {
	input: {
		width: '80%',
		paddingTop: '20px'
	}
};

class CustomPickList extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	sourceItems: [],
		// 	targetItems: []
		// };
		// this.handleOnChange = this.handleOnChange.bind(this);
	}

	// handleOnChange(event) {
	// 	const { originalList, idFieldName, descriptionFieldName } = this.props;
	// 	this.setState({ sourceItems: event.source, targetItems: event.target });

	// 	// Search description items to populate list of selected Ids.
	// 	let selectedIds = [];
	// 	event.target.forEach(selectedItem => {
	// 		let originalItem = originalList.find(
	// 			item => item[descriptionFieldName] === selectedItem
	// 		);
	// 		if (originalItem) {
	// 			selectedIds.push(originalItem[idFieldName]);
	// 		}
	// 	});
	// 	this.props.input.onChange(selectedIds);
	// 	this.props.input.value = selectedIds;
	// }

	// updateLists() {
	// 	const {
	// 		originalList,
	// 		selectedIds,
	// 		idFieldName,
	// 		descriptionFieldName
	// 	} = this.props;
	// 	let sourceItems = [];
	// 	let targetItems = [];

	// 	originalList.forEach(item => {
	// 		let selectedItem = selectedIds.find(
	// 			selectedId => selectedId === item[idFieldName]
	// 		);
	// 		if (selectedItem) {
	// 			targetItems.push(item[descriptionFieldName]);
	// 		} else {
	// 			sourceItems.push(item[descriptionFieldName]);
	// 		}
	// 	});
	// 	this.setState({
	// 		sourceItems: sourceItems,
	// 		targetItems: targetItems
	// 	});
	// }

	// componentDidMount() {
	// 	this.updateLists();
	// }

	// renderItemTemplate(item) {
	// 	let element = (
	// 		<div key={item} className="ui-helper-clearfix">
	// 			<div
	// 				style={{ fontSize: '14px', float: 'right', margin: '15px 5px 0 0' }}>
	// 				{item}
	// 			</div>
	// 		</div>
	// 	);
	// 	return { element };
	// }

	renderSelectOptions = option => (
		<option
			key={option[this.props.idFieldName]}
			value={option[this.props.idFieldName]}>
			{option[this.props.descriptionFieldName]}
		</option>
	);

	render() {
		const showError = this.props.touched && !!this.props.meta.error;
		return (
			<div style={inputStyle.input}>
				<select multiple={true} {...this.props.input} style={{ width: '100%' }}>
					{this.props.originalList.map(this.renderSelectOptions)}
				</select>
				{showError && <span style={{ color: 'red' }}>{this.props.error}</span>}
			</div>
		);
	}
}

// originalList expects a list of objects
// selectedIds expects a list of selected Ids
// idFieldName is the name of the primary key
// descriptionFieldName is the name of the description field
CustomPickList.propTypes = {
	idFieldName: PropTypes.string.isRequired,
	descriptionFieldName: PropTypes.string.isRequired,
	originalList: PropTypes.arrayOf(PropTypes.object),
	selectedIds: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default CustomPickList;
