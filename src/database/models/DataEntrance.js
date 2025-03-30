import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const DataEntrance = db.define(
	'DataEntrance',
	{
		dataEntranceId: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		muscle: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		fat: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		weight: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		water: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		visceralFat: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
	{
		tableName: 'DataEntrance',
		timestamps: true,
		paranoid: true,
	},
);

DataEntrance.sync();

export default DataEntrance;
