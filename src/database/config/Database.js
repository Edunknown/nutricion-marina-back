import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

/**
 * @file Database.js
 * @description Database configuration file
 **/

export const db = new Sequelize(
	process.env.DATABASE_NAME,
	process.env.DATABASE_USER,
	process.env.DATABASE_PASSWORD,
	{
		host: process.env.DATABASE_HOST,
		dialect: process.env.DATABASE_DIALECT,
		dialectModule: mysql2, //mariadb,
		logging: false,
	},
);

export default db;
