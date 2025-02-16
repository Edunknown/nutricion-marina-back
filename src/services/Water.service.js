import Water from '../database/models/Water.model.js';
import { formatData } from '../utils/User.utils.js';

const getUserWaters = async userId => {
	try {
		const userWaters = await Water.findAll({
			where: { userId },
			order: [['createdAt', 'DESC']],
		});

		if (!userWaters) return [];

		const formattedWaters = formatData(userWaters, 'water');

		return formattedWaters;
	} catch (err) {
		console.error(err);
		return false;
	}
};

export default { getUserWaters };
