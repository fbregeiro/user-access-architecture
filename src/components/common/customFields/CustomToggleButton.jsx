import React from 'react';
//import Toggle from 'react-toggle';

const inputStyle = {
	input: {
		width: '80%',
		paddingTop: '20px'
	}
};

class CustomToggleButton extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	checked: null
		// };
		// this.handleCheckedChanged = this.handleCheckedChanged.bind(this);
	}

	// handleCheckedChanged(event) {
	// 	this.setState({ checked: event.value });
	// 	this.props.input.onChange(event.value);
	// }

	render() {
		return (
			<div style={inputStyle.input}>
				<input type="checkbox" {...this.props.input} />
				<label htmlFor="float-input">
					{this.props.input.value ? this.props.onLabel : this.props.offLabel}&nbsp;
				</label>
				{/* <Toggle
					id={this.props.id.toString()}
					checked={this.props.input.value}
					onChange={this.props.input.onChange}
					icons={false}
				/> */}
			</div>
		);
	}
}

export default CustomToggleButton;
