import messages from './messages.json';

const validEmail = email =>
	!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const signinValidate = values => {
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

export const passwordActivationValidate = values => {
	const { token, password } = messages;
	const errors = {};

	if (!values.token) {
		errors.token = token.required;
	}

	if (!values.password) {
		errors.password = password.required;
	}

	if (values.password !== values.passwordConfirmation) {
		errors.password = password.doNotMatchConfirmation;
		errors.passwordConfirmation = password.doNotMatchConfirmation;
	}

	return errors;
};

export const accountActivationValidate = values => {
	const { accessCode, email, password } = messages;
	const errors = {};

	if (!values.accessCode) {
		errors.accessCode = accessCode.required;
	}

	if (!values.email) {
		errors.email = email.required;
	}

	if (values.email && validEmail(values.email)) {
		errors.email = email.invalid;
	}

	if (!values.password) {
		errors.password = password.required;
	}

	if (values.password !== values.passwordConfirmation) {
		errors.password = password.doNotMatchConfirmation;
		errors.passwordConfirmation = password.doNotMatchConfirmation;
	}

	return errors;
};

export const saveUserValidate = values => {
	const { email, fullName, profile } = messages;
	const errors = {};

	if (values.id) {
		if (!values.profileId) {
			errors.profileId = profile.required;
		}
	} else {
		if (!values.fullName) {
			errors.fullName = fullName.required;
		}
		if (!values.email) {
			errors.email = email.required;
		}
		if (values.email && validEmail(values.email)) {
			errors.email = email.invalid;
		}
		if (!values.profileId) {
			errors.profileId = profile.required;
		}
	}
	return errors;
};

export const saveProfileValidate = values => {
	const { description } = messages;
	const errors = {};

	if (!values.description) {
		errors.description = description.required;
	}

	return errors;
};

export const saveMyProfileValidate = values => {
	const { fullName, email, document, password } = messages;
	const errors = {};

	if (!values.fullName) {
		errors.fullName = fullName.required;
	}

	if (!values.email) {
		errors.email = email.required;
	}

	if (values.email && validEmail(values.email)) {
		errors.email = email.invalid;
	}

	if (!values.document) {
		errors.document = document.required;
	}

	if (values.password) {
		if (values.password !== values.passwordConfirmation) {
			errors.password = password.doNotMatchConfirmation;
			errors.passwordConfirmation = password.doNotMatchConfirmation;
		}
	}

	return errors;
};
