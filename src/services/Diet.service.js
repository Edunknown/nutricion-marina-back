import Diet from '../database/models/Diet.model.js';
import { formatDietDate } from '../utils/Dates.js';
import { sanitizeDiet } from '../utils/diet.utils.js';

const getUserDiets = async userId => {
	try {
		const userDiets = await Diet.findAll({
			where: { userId },
			attributes: ['dietId', 'createdAt'],
			order: [['createdAt', 'DESC']],
		});

		if (!userDiets) return [];

		const formattedDiet = userDiets.map(diet => {
			return {
				dietId: diet.dietId,
				date: formatDietDate(diet.createdAt),
			};
		});

		return formattedDiet;
	} catch (err) {
		console.error(err);
		return false;
	}
};

const getDietById = async dietId => {
	try {
		const diet = await Diet.findByPk(dietId);

		if (!diet) return false;

		const sanitizedDiet = sanitizeDiet(diet);

		return sanitizedDiet;
	} catch (err) {
		console.error(err);
		return false;
	}
};

export default { getUserDiets, getDietById };
