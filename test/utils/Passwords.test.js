/* eslint-disable no-undef */
import { expect } from 'chai';
import bcrypt from 'bcrypt';
import sinon from 'sinon';
import {
	createHash,
	checkHash,
	generateNewPassword,
} from '../../src/utils/Passwords.js';

describe('Passwords utils functions', function () {
	// Mock bcrypt
	const bcryptHash = 'hashed_password';
	const bcryptCompare = true;

	before(() => {
		// Mock bcrypt methods to avoid actual hashing
		sinon.stub(bcrypt, 'hash').resolves(bcryptHash);
		sinon.stub(bcrypt, 'compare').resolves(bcryptCompare);
	});

	after(() => {
		sinon.restore(); // Restore original bcrypt methods
	});

	// Test for createHash
	describe('createHash', function () {
		it('debería crear un hash a partir de una contraseña', async function () {
			const password = 'password123';
			const hash = await createHash(password);

			expect(hash).to.be.a('string'); // Verifica que el hash sea un string
			expect(hash).to.equal(bcryptHash); // Verifica que el hash generado sea el esperado
		});
	});

	// Test for checkHash
	describe('checkHash', function () {
		it('debería verificar que una contraseña coincide con un hash', async function () {
			const password = 'password123';
			const hash = bcryptHash;

			const isMatch = await checkHash(password, hash);
			expect(isMatch).to.be.true; // Verifica que la contraseña coincida con el hash

			// Now check for incorrect password
			sinon.restore(); // Restore bcrypt methods for this test
			sinon.stub(bcrypt, 'compare').resolves(false); // Simulate a mismatch

			const isMatchWrong = await checkHash(password, hash);
			expect(isMatchWrong).to.be.false; // Verify that incorrect password does not match
		});
	});

	// Test for generateNewPassword
	describe('generateNewPassword', function () {
		it('debería generar una nueva contraseña de 12 caracteres', function () {
			const password = generateNewPassword();
			expect(password).to.be.a('string');
			expect(password).to.have.lengthOf(12); // Verifica que la longitud sea de 12 caracteres

			// Test randomness (might not always be needed)
			const password2 = generateNewPassword();
			expect(password).to.not.equal(password2); // Ensure that generated passwords are different
		});
	});
});
