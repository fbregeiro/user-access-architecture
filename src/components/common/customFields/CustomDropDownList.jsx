import React from 'react';
import PropTypes from 'prop-types';

const inputStyle = {
	input: {
		width: '80%',
		paddingTop: '20px'
	}
};

class CustomDropDown extends React.Component {
	renderSelectOptions = option => (
		<option
			key={option[this.props.model]}
			value={option[this.props.optionLabel]}>
			{option[this.props.optionLabel]}
		</option>
	);

	render() {
		const showError = this.props.touched && !!this.props.meta.error;
		return (
			<div style={inputStyle.input}>
				<label htmlFor="float-input">{this.props.placeholder}&nbsp;</label>
				<select {...this.props.input} value={this.props.input.value}>
					{this.props.options.map(this.renderSelectOptions)}
				</select>
				{showError && <span style={{ color: 'red' }}>{this.props.error}</span>}
			</div>
		);
	}
}

CustomDropDown.propTypes = {
	model: PropTypes.string.isRequired
};

export default CustomDropDown;
