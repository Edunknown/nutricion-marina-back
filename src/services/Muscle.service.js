import Muscle from '../database/models/Muscle.model.js';
import { formatData } from '../utils/User.utils.js';

const getUserMuscles = async userId => {
	try {
		const userMuscle = await Muscle.findAll({
			where: { userId },
			order: [['createdAt', 'DESC']],
		});

		if (!userMuscle) return [];

		const formattedMuscle = formatData(userMuscle, 'muscle');

		return formattedMuscle;
	} catch (err) {
		console.error(err);
		return false;
	}
};

export default { getUserMuscles };
