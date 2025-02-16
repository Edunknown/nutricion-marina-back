import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Diet = db.define(
	'Diet',
	{
		dietId: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		diet: {
			type: DataTypes.JSON,
			allowNull: false,
		},
	},
	{
		tableName: 'Diet',
		timestamps: true,
		paranoid: true,
	},
);
Diet.sync();
export default Diet;
