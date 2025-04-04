/**
    @name checkIsEmail
    @description Check if the email is valid
    @param {String} email
    @returns {Boolean} isEmail
**/
export const checkIsEmail = email => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	return emailRegex.test(email);
};
