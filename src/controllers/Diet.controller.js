import Response from '../helpers/Response.helper.js';
import DietService from '../services/Diet.service.js';
import { LogError } from '../utils/Logs.js';

const getDietInfo = async (req, res) => {
	const response = new Response(res);

	try {
		const { dietId } = req.params;

		const diet = await DietService.getDietById(dietId);
		if (!diet) return response.ko('Dieta no encontrada');

		return response.ok('Dieta encontrada', diet);
	} catch (err) {
		LogError('🚀 ~ getDietInfo ~ err:', err);
		return response.ko('Error obteniendo dietas');
	}
};

export default { getDietInfo };
