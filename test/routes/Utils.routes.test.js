/* eslint-disable no-undef */
import { expect } from 'chai';
import Validations from '../helpers/RequestResponses.js';

// Casos de prueba para las rutas de utilidad
describe('Utility Routes', () => {
	// Probar todos los métodos GET
	describe('GET', () => {
		it('Debe devolver la información correcta de la API', async () => {
			const res = await global.app.get('/');

			Validations.checkCorrectRequestResponse(res);

			const { message, data } = res.body;

			expect(message, 'Campo message').to.equal('API is running');

			expect(data, 'Contenido de data').to.include.all.keys(
				'name',
				'version',
			);
			expect(data.name, 'Nombre de la API').to.equal(
				process.env.APP_NAME || 'Unknown API',
			);
			expect(data.version, 'Versión de la API').to.equal(
				process.env.APP_VERSION || '1.0.0',
			);
		});

		it('Debe responder correctamente en la ruta de ping', async () => {
			const res = await global.app.get('/ping');

			Validations.checkCorrectRequestResponse(res);

			const { message, data } = res.body;

			expect(message, 'Campo message').to.equal('Pong!');

			expect(data, 'Contenido de data').to.include.all.keys('API', 'DB');
			expect(data.API, 'Estado de la API').to.equal('Fully operational');
			expect(data.DB, 'Estado de la base de datos').to.be.oneOf([
				'Connected',
				'Not connected',
			]);
		});

		it('Debe devolver 404 para rutas no definidas', async () => {
			const res = await global.app.get('/nonexistent-route');

			Validations.checkBadRequestResponse(res, 404);

			expect(res.body)
				.to.have.property('message')
				.to.equal('Route not found');
		});
	});
});
