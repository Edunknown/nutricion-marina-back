import Fat from './Fat.model.js';
import Muscle from './Muscle.model.js';
import User from './User.model.js';
import VisceralFat from './VisceralFat.model.js';
import Water from './Water.model.js';
import Weight from './Weight.model.js';

export const defineAssociations = async () => {
	User.hasMany(Weight, {
		foreignKey: 'userId',
		as: 'weights',
		allowNull: false,
		onDelete: 'CASCADE',
	});
	Weight.belongsTo(User, {
		foreignKey: 'userId',
		as: 'user',
		allowNull: false,
		onDelete: 'CASCADE',
	});

	User.hasMany(Fat, {
		foreignKey: 'userId',
		as: 'fats',
		allowNull: false,
		onDelete: 'CASCADE',
	});
	Fat.belongsTo(User, {
		foreignKey: 'userId',
		as: 'user',
		allowNull: false,
		onDelete: 'CASCADE',
	});

	User.hasMany(Muscle, {
		foreignKey: 'userId',
		as: 'muscles',
		allowNull: false,
		onDelete: 'CASCADE',
	});
	Muscle.belongsTo(User, {
		foreignKey: 'userId',
		as: 'user',
		allowNull: false,
		onDelete: 'CASCADE',
	});

	User.hasMany(Water, {
		foreignKey: 'userId',
		as: 'waters',
		allowNull: false,
		onDelete: 'CASCADE',
	});
	Water.belongsTo(User, {
		foreignKey: 'userId',
		as: 'user',
		allowNull: false,
		onDelete: 'CASCADE',
	});

	User.hasMany(VisceralFat, {
		foreignKey: 'userId',
		as: 'visceralFats',
		allowNull: false,
		onDelete: 'CASCADE',
	});
	VisceralFat.belongsTo(User, {
		foreignKey: 'userId',
		as: 'user',
		allowNull: false,
		onDelete: 'CASCADE',
	});
};
