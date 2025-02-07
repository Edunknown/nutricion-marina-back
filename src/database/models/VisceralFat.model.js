import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

/**
 * @file Weight.model.js
 * @description Sequelize model for visceral fat table relation in database
 * @author Eduardo Ruiz Moreno - @Eduknown
 */

const VisceralFat = db.define(
	'VisceralFat',
	{
		userId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			references: {
				model: 'User',
				key: 'userId',
			},
		},
		visceralFatId: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		visceralFat: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
	{
		tableName: 'VisceralFat',
		timestamps: true,
		paranoid: true,
	},
);
export default VisceralFat;
