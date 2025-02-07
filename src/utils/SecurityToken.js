import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { LogError } from './Logs.js';

const JWT_SECRET = process.env.JWT_SECRET;
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET;

/**
 * @name encodePayload
 * @description Encrypts the data passed by parameters.
 * @param {object} data
 * @returns {string} Encrypted data.
 * @author Jesús Sánchez Fernández
 */
export const encodePayload = data => {
	const payloadString = JSON.stringify(data);
	const encryptedPayload = CryptoJS.AES.encrypt(
		payloadString,
		PAYLOAD_SECRET,
	).toString();
	return encryptedPayload;
};

/**
 * @name decodePayload
 * @description Decrypts the data passed by parameters.
 * @param {string} data
 * @returns {object} Decrypted data.
 * @author Jesús Sánchez Fernández
 */
export const decodePayload = data => {
	const decryptedBytes = CryptoJS.AES.decrypt(data, PAYLOAD_SECRET);
	const decryptedPayloadString = decryptedBytes.toString(CryptoJS.enc.Utf8);
	const decryptedPayload = JSON.parse(decryptedPayloadString);
	return decryptedPayload;
};

/**
 *
 * @name encodeToken
 * @description Encrypts data passed by parameters.
 * @param {object} data
 * @returns {string} Token.
 *
 */
export const encodeToken = data => {
	console.log('🚀 ~ data:', data);
	data = encodePayload(data);
	const encodeToken = jwt.sign(
		{
			data,
		},
		JWT_SECRET,
		{
			expiresIn: '1h',
		},
	);

	return encodeToken;
};

/**
 *
 * @name decodeToken
 * @description Decrypts the token that is passed to it by parameters.
 * @param {string} token
 * @returns {object} Data.
 *
 */
export const decodeToken = token => {
	try {
		const { data } = jwt.verify(token, JWT_SECRET);
		console.log('🚀 ~ data:', data);
		return decodePayload(data);
	} catch (error) {
		LogError('decodeToken', error);
		return false;
	}
};
