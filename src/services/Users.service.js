import { Op } from 'sequelize';
import { LogError } from '../utils/Logs.js';
import { checkHash, createHash } from '../utils/Passwords.js';
import { cleanUser, sanitizeUserDataArray } from '../utils/User.utils.js';
import User from '../database/models/User.model.js';
import Diet from '../database/models/Diet.model.js';
import DataEntrance from '../database/models/DataEntrance.js';

/**
 * @name getAllUsers
 * @description Get all user information from the database
 * @returns {Array} a list of users with the information provided in the database.
 * @returns {Boolean} false in the case the users are not found
 * @author Eduardo Ruiz Moreno - @Edunknown
 */

export const getAllUsers = async search => {
	const whereClause = {
		role: 'user',
		...(search && {
			[Op.or]: [
				{ nombre: { [Op.like]: `%${search}%` } },
				{ email: { [Op.like]: `%${search}%` } },
				{ dni: { [Op.like]: `%${search}%` } },
				{ telefono: { [Op.like]: `%${search}%` } },
			],
		}),
	};
	try {
		const users = await User.findAll({
			where: whereClause,
			exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
		});
		if (!users) return [];
		return sanitizeUserDataArray(users);
	} catch (err) {
		LogError('🚀 ~ getAllUsers ~ err:', err);
		return false;
	}
};

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
 * @author Eduardo Ruiz Moreno - @Edunknown
 */

const getOneUserInfo = async userId => {
	try {
		const user = await User.findByPk(userId);
		if (!user) return false;

		return user;
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
 * @author Eduardo Ruiz Moreno - @Edunknown
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
 * @author Eduardo Ruiz Moreno - @Edunknown
 */

export const login = async ({ email, password }) => {
	try {
		const user = await getOneUserByEmail(email);
		if (!user) return false;

		if (user.deletedAt) return false;

		const isPasswordCorrect = await checkHash(password, user.password);
		if (!isPasswordCorrect) return false;

		const cleanedUser = cleanUser(user);

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
 * @author Eduardo Ruiz Moreno - @Edunknown
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

export const getAdminUserInfo = async userId => {
	try {
		const user = await User.findByPk(userId, {
			include: [
				{
					model: Diet,
					as: 'diet',
					attributes: ['dietId', 'userId', 'createdAt'],
				},
				{
					model: DataEntrance,
					as: 'dataEntrances',
				},
			],
			order: [
				['diet', 'createdAt', 'DESC'],
				['dataEntrances', 'createdAt', 'DESC'],
			],
		});
		if (!user) return false;
		return user;
	} catch (err) {
		LogError('🚀 ~ getAdminUserInfo ~ err:', err);
		return false;
	}
};

export default {
	getUserPasswordService,
	getFullUserService,
	login,
	register,
	getOneUserInfo,
	getAllUsers,
	getAdminUserInfo,
};
