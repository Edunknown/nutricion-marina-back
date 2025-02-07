/* eslint-disable no-undef */
import supertest from 'supertest';
import startServer from '../src/server.js';

// -------------------------------------------------------------------------
// | 						    GLOBAL SETUP                               |
// -------------------------------------------------------------------------

before(async function () {
	this.timeout(10000);
	const server = await startServer();
	const requester = supertest(server);
	global.app = requester; // Hacer disponible el requester a nivel global
});

// -------------------------------------------------------------------------
