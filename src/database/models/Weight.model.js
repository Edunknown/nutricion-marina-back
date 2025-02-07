import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

/**
 * @file Weight.model.js
 * @description Sequelize model for users table relation in database
 * @author Eduardo Ruiz Moreno - @Eduknown
 */

const Weight = db.define(
	'Weight',
	{
		userId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			references: {
				model: 'User',
				key: 'userId',
			},
		},
		weightId: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		weight: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
	{
		tableName: 'Weight',
		timestamps: true,
		paranoid: true,
	},
);
export default Weight;
