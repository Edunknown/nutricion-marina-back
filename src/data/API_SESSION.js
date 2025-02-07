// Session options
import { Store } from 'express-session';

// Database
import SequelizeStore from 'connect-session-sequelize';
import { db } from '../database/config/Database.js';

import { IS_PRODUCTION } from './API_DOCS_INFO.js';

export const sessionStore = SequelizeStore(Store);

// Sesiones
export const SESSION_STORE = new sessionStore({
	db: db,
});

export const SESSION_OPTIONS = {
	secret: process.env.APP_SECRET,
	resave: false,
	saveUninitialized: true,
	store: SESSION_STORE,
	cookie: {
		secure: 'auto',
		sameSite: true,
		maxAge: 60 * 60 * 24 * 1000,
	},
};

// Compatibilidad con Chrome, Firefox y Safari
if (IS_PRODUCTION) {
	SESSION_OPTIONS.cookie.secure = true;
	SESSION_OPTIONS.proxy = true;
}
