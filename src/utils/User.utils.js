import { formatDate } from './Dates.js';

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
