import Fat from '../database/models/Fat.model.js';
import { formatData } from '../utils/User.utils.js';

const getUserFats = async userId => {
	try {
		const userFats = await Fat.findAll({
			where: { userId },
			order: [['createdAt', 'DESC']],
		});

		if (!userFats) return [];

		const formattedFats = formatData(userFats, 'fat');

		return formattedFats;
	} catch (err) {
		console.error(err);
		return false;
	}
};

export default { getUserFats };
