import { formatNumber } from './Numbers.js';

/**
 * @name getStringDate
 * @description Returns the current date and time in the format: dd/mm/yyyy - hh:mm:ss
 * @returns {string} Date and time
 **/

export const getStringDate = () => {
	const date = new Date();
	const day = formatNumber(date.getDate());
	const month = formatNumber(date.getMonth() + 1);
	const year = date.getFullYear();
	const hours = formatNumber(date.getHours());
	const minutes = formatNumber(date.getMinutes());
	const seconds = formatNumber(date.getSeconds());

	const formattedDate = `${day}/${month}/${year}`;
	const formattedTime = `${hours}:${minutes}:${seconds}`;

	return `${formattedDate} - ${formattedTime}`;
};

export const formatDate = date => {
	const d = new Date(date);
	const day = d.getDate();
	const monthNames = [
		'Ene',
		'Feb',
		'Mar',
		'Abr',
		'May',
		'Jun',
		'Jul',
		'Ago',
		'Sep',
		'Oct',
		'Nov',
		'Dic',
	];
	const month = monthNames[d.getMonth()];
	return `${day} - ${month}`;
};

export const formatDietDate = date => {
	const d = new Date(date);
	const day = d.getDate();
	const monthNames = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	];
	const month = monthNames[d.getMonth()];
	return `${day} ${month}`;
};
