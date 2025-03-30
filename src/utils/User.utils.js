import { formatDate, formatDietDate } from './Dates.js';

export const cleanUser = user => {
	delete user.password;
	delete user.createdAt;
	delete user.updatedAt;
	delete user.deletedAt;
	return user;
};

export const formatData = (myData, label) => {
	let data = { values: [], dates: [] };
	myData.forEach(item => {
		data.values.push(item?.[label]);
		data.dates.push(formatDate(item.createdAt));
	});
	return data;
};

const sanitizeUserData = user => {
	return {
		userId: user.userId,
		nombre: user.nombre,
		email: user.email,
		dni: user.dni,
		telefono: user.telefono,
	};
};

export const sanitizeAdminUserData = userData => {
	const user = sanitizeUserData(userData);
	const diets = sanitizeDietArray(userData.diet);
	const dataEntrances = sanitizeDataEntranceArray(userData.dataEntrances);
	return {
		user,
		diets,
		dataEntrances,
	};
};

const sanitizeDietArray = diets => {
	return diets.map(diet => {
		return sanitizeDiet(diet);
	});
};

const sanitizeDiet = diet => {
	return {
		userId: diet.userId,
		dietId: diet.dietId,
		date: formatDietDate(diet.createdAt),
	};
};

const sanitizeDataEntranceArray = dataEntrances => {
	return dataEntrances.map(dataEntrance => {
		return sanitizeDataEntrance(dataEntrance);
	});
};

const sanitizeDataEntrance = dataEntrance => {
	return {
		weight: dataEntrance.weight,
		muscle: dataEntrance.muscle,
		fat: dataEntrance.fat,
		water: dataEntrance.water,
		visceralFat: dataEntrance.visceralFat,
		date: formatDate(dataEntrance.createdAt),
	};
};

export const sanitizeUserDataArray = users => {
	return users.map(user => sanitizeUserData(user));
};
