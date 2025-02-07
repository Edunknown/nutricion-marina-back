import { expect } from 'chai';

const checkCorrectRequestResponse = res => {
	expect(res.status, 'Estado de respuesta').to.equal(200);
	expect(res.body, 'Cuerpo de respuesta').to.be.an('object');
	expect(res.body, 'Cuerpo de respuesta').to.include.all.keys(
		'error',
		'message',
		'data',
	);
	expect(res.body.error, 'Campo error').to.be.false;
	expect(res.body.data, 'Campo data').to.be.an('object');
};

const checkBadRequestResponse = (res, statusCode = 400) => {
	expect(res.status, 'Estado de respuesta').to.equal(statusCode);
	expect(res.body, 'Cuerpo de respuesta').to.be.an('object');
	expect(res.body, 'Cuerpo de respuesta').to.include.all.keys(
		'error',
		'message',
	);
	expect(res.body.error, 'Campo error').to.be.true;
};

export default {
	checkCorrectRequestResponse,
	checkBadRequestResponse,
};
