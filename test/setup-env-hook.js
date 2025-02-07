import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Ruta al archivo .env.dev (MODO DESARROLLO)
const envPath = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	'../.env.dev',
);

// // Ruta al archivo .env (MODO PRODUCCIÓN)
// const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../.env");

// Leer y parsear el archivo .env
if (fs.existsSync(envPath)) {
	const envConfig = fs.readFileSync(envPath, 'utf8');
	envConfig.split('\n').forEach(line => {
		// Eliminar espacios en blanco y comentarios
		line = line.trim();
		if (line && !line.startsWith('#')) {
			const [key, value] = line.split('=');
			if (key && value !== undefined) {
				// Eliminar espacios en blanco de clave y valor
				process.env[key.trim()] = value.trim();
			}
		}
	});
}
