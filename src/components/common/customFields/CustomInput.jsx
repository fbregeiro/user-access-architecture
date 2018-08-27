import React from 'react';
import PropTypes from 'prop-types';

const CustomInput = ({
	input,
	label,
	meta: { touched = true, error },
	styles,
	...custom
}) => {
	const inputStyle = styles || {
		input: {
			width: '80%'
		}
	};

	const showError = touched && !!error;

	return (
		<div style={inputStyle.input}>
			<span className="ui-float-label">
				<label htmlFor="float-input">{label}&nbsp;</label>
				<input id="float-input" label={label} {...input} {...custom} />
			</span>
			{showError && (
				<span style={{ fontSize: '12px', color: 'red' }}>{error}</span>
			)}
		</div>
	);
};

CustomInput.propTypes = {
	label: PropTypes.string
};

export default CustomInput;
