import { formatDietDate } from './Dates.js';

export const sanitizeDiet = diet => {
	return {
		dietId: diet.dietId,
		diet: sortDiet(diet.diet),
		date: formatDietDate(diet.createdAt),
	};
};

const sortDiet = diet => {
	return {
		Lunes: diet.Lunes,
		Martes: diet.Martes,
		Miércoles: diet.Miércoles,
		Jueves: diet.Jueves,
		Viernes: diet.Viernes,
		Sábado: diet.Sábado,
		Domingo: diet.Domingo,
	};
};
