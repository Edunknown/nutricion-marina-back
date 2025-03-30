import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

/**
 * @file Users.model.js
 * @description Sequelize model for users table relation in database
 * @author Unknown Gravity | All-in-one Blockchain Company
 * @todo Add more fields
 * @todo Add more validations
 */

const User = db.define(
	'User',
	{
		userId: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		dni: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
		},
		telefono: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM,
			values: ['user', 'admin'],
			defaultValue: 'user',
			allowNull: false,
		},
		isVerified: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		tableName: 'User',
		timestamps: true,
		paranoid: true,
	},
);

export default User;
