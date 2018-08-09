import messages from './messages.json';

const validEmail = email =>
	!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const loginValidate = values => {
	const { email, password } = messages;
	const errors = {};

	if (!values.email) {
		errors.email = email.required;
	}

	if (values.email && validEmail(values.email)) {
		errors.email = email.invalid;
	}

	if (!values.password) {
		errors.password = password.required;
	}

	return errors;
};

export const resetPasswordValidate = values => {
	const { email } = messages;
	const errors = {};

	if (!values.email) {
		errors.email = email.required;
	}

	if (values.email && validEmail(values.email)) {
		errors.email = email.invalid;
	}

	return errors;
};
