import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

/**
 * @file Weight.model.js
 * @description Sequelize model for users table relation in database
 * @author Eduardo Ruiz Moreno - @Eduknown
 */

const Water = db.define(
	'Water',
	{
		userId: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			references: {
				model: 'User',
				key: 'userId',
			},
		},
		waterId: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		water: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
	{
		tableName: 'Water',
		timestamps: true,
		paranoid: true,
	},
);
export default Water;
