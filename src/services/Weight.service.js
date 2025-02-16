import Weight from '../database/models/Weight.model.js';
import { formatData } from '../utils/User.utils.js';

const getUserWeights = async userId => {
	try {
		const userWeights = await Weight.findAll({
			where: { userId },
			order: [['createdAt', 'DESC']],
		});

		if (!userWeights) return [];

		const formattedWeights = formatData(userWeights, 'weight');

		return formattedWeights;
	} catch (err) {
		console.error(err);
		return false;
	}
};

export default { getUserWeights };
