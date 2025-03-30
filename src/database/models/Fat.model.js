import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

/**
 * @file Weight.model.js
 * @description Sequelize model for fat table relation in database
 * @author Eduardo Ruiz Moreno - @Edunknown
 */

const Fat = db.define(
	'Fat',
	{
		userId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			references: {
				model: 'User',
				key: 'userId',
			},
		},
		fatId: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		fat: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
	{
		tableName: 'Fat',
		timestamps: true,
		paranoid: true,
	},
);
export default Fat;
