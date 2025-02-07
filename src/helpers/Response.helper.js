import { encodeToken } from '../utils/SecurityToken.js';

/**
 * @class Response
 * @description Response helper
 * @version 0.0.2
 */
export class Response {
	constructor(res) {
		this.res = res;
		this.responseJson = {
			error: null,
			message: null,
			data: undefined,
		};
	}

	// -------------------------------------------------------------------------
	// |                               OK RESPONSES                            |
	// -------------------------------------------------------------------------

	// Generic OK response
	ok(message, data) {
		this.responseJson.error = false;
		this.responseJson.message = message;
		this.responseJson.data = data;

		this.res.status(200).send(this.responseJson);
	}

	// OK response with encoded data
	encodedOk(message, data) {
		this.responseJson.error = false;
		this.responseJson.message = message;
		this.responseJson.data = encodeToken(data);

		this.res.status(200).send(this.responseJson);
	}

	// Resource created
	created(message, data) {
		this.responseJson.error = false;
		this.responseJson.message = message;
		this.responseJson.data = data;

		this.res.status(201).send(this.responseJson);
	}

	// -------------------------------------------------------------------------
	// |                               KO RESPONSES                            |
	// -------------------------------------------------------------------------

	// Generic error response
	ko(message) {
		this.responseJson.error = true;
		this.responseJson.message = message;

		this.res.status(400).send(this.responseJson);
	}

	// No authorized to access the resource (Need to login)
	unauthorized(message) {
		this.responseJson.error = true;
		this.responseJson.message = message;

		this.res.status(401).send(this.responseJson);
	}

	// Forbidden to access the resource (No permissions)
	forbidden(message) {
		this.responseJson.error = true;
		this.responseJson.message = message;

		this.res.status(403).send(this.responseJson);
	}

	// No content to return
	notFound(message) {
		this.responseJson.error = true;
		this.responseJson.message = message;

		this.res.status(404).send(this.responseJson);
	}

	// Not allowed method
	notAllowed(message) {
		this.responseJson.error = true;
		this.responseJson.message = message;

		this.res.status(405).send(this.responseJson);
	}

	// Route not found
	ko404() {
		this.responseJson.error = true;
		this.responseJson.message = 'Route not found';

		this.res.status(404).send(this.responseJson);
	}

	// Custom error response
	custom(codeStatus, message, err) {
		this.responseJson.error = true;
		this.responseJson.message = message;
		this.responseJson.data = err;

		this.res.status(codeStatus).send(this.responseJson);
	}

	// -------------------------------------------------------------------------
	// |                               SOCKET RESPONSES                        |
	// -------------------------------------------------------------------------

	/*
    socket_ok(message) {
        const response = message;
        delete this.responseJson.error;
        this.responseJson = message;

        return this.responseJson;
    }

    socket_ko(message) {
        return {
            error:{
                message
            }
        };
    }
    */
}

export default Response;
