import path from 'path';
import app from './index.js';
import { checkAndSyncDatabaseService } from './services/Database.service.js';
import { LogMessage } from './utils/Logs.js';
import { fileURLToPath } from 'url';

// -------------------------------------------------------------------------
// |                              SERVER START                             |
// -------------------------------------------------------------------------

const PORT = process.env.APP_PORT || 3333;

const startServer = async () => {
	LogMessage('Starting server');
	try {
		await checkAndSyncDatabaseService();
		const server = app.listen(PORT, () => {
			LogMessage(`Server running.`);
			LogMessage(`API is accessible at ${process.env.API_URL}`);
			LogMessage(
				`API documentation available at ${process.env.API_URL}/doc`,
			);
		});
		return server;
	} catch (error) {
		LogMessage(`Failed to start server: ${error.message}`, 'error');
		process.exit(1); // Exit the process with an error code
	}
};

// Si este archivo es ejecutado directamente (no importado por otro módulo), inicia el servidor
const currentFilePath = path.normalize(fileURLToPath(import.meta.url));
const mainEntryPath = path.normalize(process.argv[1]);
if (currentFilePath === mainEntryPath) {
	startServer();
}

export default startServer;
