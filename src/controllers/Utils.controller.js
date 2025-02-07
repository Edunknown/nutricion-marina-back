import Response from '../helpers/Response.helper.js';
import { checkDbConnectionService } from '../services/Database.service.js';
import { LogError } from '../utils/Logs.js';

/**
 * @name defaultController
 * @description Default controller
 * @method GET
 * @returns {Object} API information
 */
const defaultController = (req, res) => {
	const response = new Response(res);

	// Get API version
	const version = process.env.APP_VERSION || '1.0.0';

	// Get API name
	const name = process.env.APP_NAME || 'Unknown API';

	// Send response
	return response.ok('API is running', {
		name,
		version,
	});
};

/**
 * @name pingController
 * @description Check if API is running
 * @method GET
 * @returns {Object} API status
 **/
const pingController = async (req, res) => {
	const response = new Response(res);

	try {
		const dbConnected = await checkDbConnectionService();

		return response.ok('Pong!', {
			API: 'Fully operational',
			DB: dbConnected ? 'Connected' : 'Not connected',
		});
	} catch (err) {
		LogError('🚀 ~ pingController ~ err:', err);
		response.ko(err.message);
	}
};

const error404Controller = async (req, res) => {
	const response = new Response(res);
	return response.ko404();
};

export default {
	defaultController,
	pingController,
	error404Controller,
};
