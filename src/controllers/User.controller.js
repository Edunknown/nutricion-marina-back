import Users from '../database/models/User.model.js';
import Response from '../helpers/Response.helper.js';
import { LogError } from '../utils/Logs.js';
import UsersService from '../services/Users.service.js';

/**
 * @name getAllUsers
 * @description Get all user information from the database
 * @returns {Array} a list of users with the information provided in the database.
 * @author Eduardo Ruiz Moreno - @Eduknown
 */

const getAllUsers = async (req, res) => {
	const response = new Response(res);
	try {
		const users = await Users.findAll();
		return response.ok('Usuarios encontrados', users);
	} catch (err) {
		LogError('🚀 ~ getAllUsers ~ err:', err);
		return response.ko('Error obteniendo usuarios');
	}
};

/**
 * @name login
 * @description Login a user with email and password
 * @param {String} email The email of the user provided by the front
 * @param {String} password The password of the user provided by the front
 * @returns {Object} user in the case the login is successful
 * @returns {Boolean} false in the case the login is not successful
 * @author Eduardo Ruiz Moreno - @Eduknown
 */

const login = async (req, res) => {
	const response = new Response(res);
	try {
		const { email, password } = req.body;
		console.log('🚀 ~ login ~ email:', email);

		const user = await UsersService.login({ email, password });
		if (!user) return response.ko('Usuario no encontrado');

		return response.encodedOk('Usuario logueado', user);
	} catch (err) {
		LogError('🚀 ~ login ~ err:', err);
		return response.ko('Error en el login');
	}
};

/**
 * @name register
 * @description Register a user with email and password
 * @param {String} email The email of the user provided by the front
 * @param {String} password The password of the user provided by the front
 * @returns {Object} user in the case the user is registered
 * @returns {Boolean} false in the case the user is not registered
 * @returns {Boolean} false in the case the user is deleted
 * @returns {Boolean} false in the case the user is not found
 * @authro Eduardo Ruiz Moreno - @Eduknown
 */

const register = async (req, res) => {
	const response = new Response(res);
	try {
		const { email, password } = req.body;

		const user = await UsersService.register({ email, password });
		if (!user) return response.ko('Usuario no registrado');

		return response.encodedOk('Usuario registrado', user.dataValues);
	} catch (err) {
		LogError('🚀 ~ register ~ err:', err);
		return response.ko('Error en el registro');
	}
};

/**
 * @name getUserById
 * @description Get one user by id from the database
 * @param {String} id The id of the user provided by the front
 * @returns {Object} user in the case the user is found
 * @returns {Boolean} false in the case the user is not found
 * @returns {Boolean} false in the case the user is deleted
 * @returns {Boolean} false in the case the user is not found
 * @author Eduardo Ruiz Moreno - @Eduknown
 */

const getUserById = async (req, res) => {
	const response = new Response(res);
	try {
		const { id } = req.params;
		console.log('🚀 ~ getUserById ~ id:', id);
		const user = await UsersService.getOneUserInfo(id);
		console.log('🚀 ~ getUserById ~ user:', user);
		if (!user) return response.ko('Usuario no encontrado');
		return response.ok('Usuario encontrado', user);
	} catch (err) {
		LogError('🚀 ~ getUserById ~ err:', err);
		return response.ko('Error obteniendo usuario');
	}
};

export default { getAllUsers, login, register, getUserById };
