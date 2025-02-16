import VisceralFat from '../database/models/VisceralFat.model.js';
import { formatData } from '../utils/User.utils.js';

const getUserVisceralFats = async userId => {
	try {
		const userVisceralFats = await VisceralFat.findAll({
			where: { userId },
			order: [['createdAt', 'DESC']],
		});

		if (!userVisceralFats) return [];

		const formattedVisceralFats = formatData(
			userVisceralFats,
			'visceralFat',
		);

		return formattedVisceralFats;
	} catch (err) {
		console.error(err);
		return false;
	}
};

export default { getUserVisceralFats };
