import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

/**
 * @file Muscle.model.js
 * @description Sequelize model for muscle table relation in database
 * @author Eduardo Ruiz Moreno - @Edunknown
 */

const Muscle = db.define(
	'Muscle',
	{
		userId: {
			type: DataTypes.UUID,

			defaultValue: DataTypes.UUIDV4,
			references: {
				model: 'User',
				key: 'userId',
			},
		},
		muscleId: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		muscle: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
	{
		tableName: 'Muscle',
		timestamps: true,
		paranoid: true,
	},
);
export default Muscle;
