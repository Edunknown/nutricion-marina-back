import { Op } from 'sequelize';
import { LogError } from '../utils/Logs.js';
import { checkHash, createHash } from '../utils/Passwords.js';
import { cleanUser } from '../utils/User.utils.js';
import Weight from '../database/models/Weight.model.js';
import Fat from '../database/models/Fat.model.js';
import VisceralFat from '../database/models/VisceralFat.model.js';
import Water from '../database/models/Water.model.js';
import Muscle from '../database/models/Muscle.model.js';
import User from '../database/models/User.model.js';
import { formatDate } from '../utils/Dates.js';

/**
 * @name getUserPasswordService
 * @description Get the user password from the database
 * @param {String} usernameOrEmail
 * @returns {String} password
 **/
export const getUserPasswordService = async usernameOrEmail => {
	try {
		const user = await User.findOne({
			where: {
				[Op.or]: [
					{ username: usernameOrEmail },
					{ email: usernameOrEmail },
				],
			},
			attributes: ['userId', 'password'],
		});

		if (!user) return false;
		return user;
	} catch (err) {
		LogError('🚀 ~ getUserPasswordService ~ err:', err);
		return false;
	}
};

/**
 * @name getFullUserService
 * @description Get the full user data from the database
 * @param {String} usernameOrEmail
 * @returns {Object} user
 **/

export const getFullUserService = async userId => {
	try {
		const user = await User.findByPk(userId);
		if (!user) return false;

		// Remove password from the user object
		delete user.dataValues.password;

		return user;
	} catch (err) {
		LogError('🚀 ~ getFullUserService ~ err:', err);
		return false;
	}
};

/**
 * @name getOneUserInfo
 * @description Get one user information to show the data in the front. It gets:
 * - Weights - The weight of the user
 * - Fats - The fat of the user
 * - VisceralFats - The visceral fat of the user
 * - Waters - The water of the user
 * - Muscles - The muscle of the user
 * @param {String} userId
 * @returns {Object} user - The user information provided by the database
 * @returns {Boolean} false - In the case the user is not found
 * @returns {Boolean} false - In the case the user is deleted
 * @author Eduardo Ruiz Moreno - @Eduknown
 */

const getOneUserInfo = async userId => {
	try {
		const associations = [
			{
				model: Weight,
				as: 'weights',
				attribute: 'weight',
			},
			{
				model: Fat,
				as: 'fats',
				attribute: 'fat',
			},
			{
				model: VisceralFat,
				as: 'visceralFats',
				attribute: 'visceralFat',
			},
			{
				model: Water,
				as: 'waters',
				attribute: 'water',
			},
			{
				model: Muscle,
				as: 'muscles',
				attribute: 'muscle',
			},
		];

		// Se incluye también el campo 'createdAt'
		const includeOptions = associations.map(({ model, as, attribute }) => ({
			model,
			as,
			attributes: [attribute, 'createdAt'],
			where: { deletedAt: null },
			order: [['createdAt', 'DESC']],
			required: false,
		}));

		const user = await User.findByPk(userId, {
			include: includeOptions,
		});

		const userJson = user.toJSON();

		// Para cada asociación definida, transformar el array de objetos
		// a un array de objetos que incluyen el valor y la fecha formateada.
		associations.forEach(({ as, attribute }) => {
			if (Array.isArray(userJson[as])) {
				const values = [];
				const dates = [];

				userJson[as].forEach(item => {
					values.push(item[attribute]);
					dates.push(formatDate(item.createdAt));
				});

				userJson[as] = { values, dates };
			}
		});

		return userJson;
	} catch (err) {
		LogError('🚀 ~ getOneUserInfo ~ err:', err);
		return false;
	}
};

/**
 * @name getOneUserByEmail
 * @description Get one user by email from the database
 * @param {String} email
 * @returns {Object} User - The user information provided by the database
 * @returns {Boolean} false - In the case the user is not found
 * @returns {Boolean} false - In the case the user is deleted
 * @author Eduardo Ruiz Moreno - @Eduknown
 **/

export const getOneUserByEmail = async email => {
	try {
		const user = await User.findOne({
			where: { email, deletedAt: null },
		});

		if (!user) return false;
		return user;
		// Convertir el resultado a un objeto plano
	} catch (err) {
		LogError('🚀 ~ getOneUserByEmail ~ err:', err);
		return false;
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

export const login = async ({ email, password }) => {
	try {
		const user = await getOneUserByEmail(email);
		console.log('🚀 ~ login ~ user:', user);
		if (!user) return false;

		if (user.deletedAt) return false;

		const isPasswordCorrect = await checkHash(password, user.password);
		console.log('🚀 ~ login ~ isPasswordCorrect:', isPasswordCorrect);
		if (!isPasswordCorrect) return false;

		const cleanedUser = cleanUser(user);
		console.log('🚀 ~ login ~ cleanedUser:', cleanedUser);

		return cleanedUser;
	} catch (err) {
		LogError('🚀 ~ login ~ err:', err);
		throw err;
	}
};

/**
 * @name register
 * @description Register a user with email and password
 * @param {String} email The email of the user provided by the front
 * @param {String} password The password of the user provided by the front
 * @returns {Object} user in the case the register is successful
 * @returns {Boolean} false in the case the register is not successful
 * @returns {Boolean} false in the case the user already exists
 * @returns {Boolean} false in the case the password cannot be hashed
 * @returns {Boolean} false in the case the user cannot be created
 * @author Eduardo Ruiz Moreno - @Eduknown
 */

export const register = async ({ email, password }) => {
	try {
		const hashedPassword = await createHash(password);
		if (!hashedPassword) return false;

		const user = await User.create({
			nombre: 'admin',
			role: 'admin',
			email,
			password: hashedPassword,
		});
		if (!user) return false;

		const cleanedUser = cleanUser(user);

		return cleanedUser;
	} catch (err) {
		LogError('🚀 ~ login ~ err:', err);
		throw err;
	}
};

export default {
	getUserPasswordService,
	getFullUserService,
	login,
	register,
	getOneUserInfo,
};
