import { SESSION_STORE } from '../data/API_SESSION.js';
import db from '../database/config/Database.js';
import { LogMessage, LogError } from '../utils/Logs.js';
import { defineAssociations } from '../database/models/Associations.js';

/**
 * @name checkAndSyncDatabaseService
 * @description Checks the database connection and synchronizes it.
 * @returns {void}
 * @throws {Error} If the database connection fails.
 * @throws {Error} If the database synchronization fails.
 * @throws {Error} If the session store synchronization fails.
 * @author Jesús Sánchez Fernández
 **/
export const checkAndSyncDatabaseService = async () => {
	// Check database connection
	await db.authenticate().catch(error => {
		LogError('Unable to connect to the database:', error);
		throw error;
	});
	LogMessage('Database connection has been established successfully.');

	await defineAssociations();
	// Synchronize database
	await db.sync().catch(error => {
		LogError('Unable to synchronize the database:', error);
		throw error;
	});

	LogMessage('Database has been synchronized.');

	// Synchronize session store
	await SESSION_STORE.sync().catch(error => {
		LogError('Unable to synchronize session store:', error);
		throw error;
	});
	LogMessage('Session store has been synchronized.');
};

/**
 * @name checkDbConnectionService
 * @description Check if database is connected
 * @returns {Boolean} isConnected
 **/
export const checkDbConnectionService = async () => {
	let isConnected = false;

	try {
		await db.authenticate();
		isConnected = true;
	} catch (err) {
		LogError('Database.js -> checkConnection ->', err);
	}

	return isConnected;
};
