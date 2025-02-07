// -------------------------------------------------------------------------
// |                              IMPORTS                                  |
// -------------------------------------------------------------------------
// Express Server
import express from 'express';
// Session
import session from 'express-session';

// Security
import cors from 'cors';
import helmet from 'helmet';

// Compression
import compression from 'compression';

// Rutas
import UtilityRoutes from './routes/Utils.routes.js';
import userRoutes from './routes/User.routes.js';

// Utils
import { DOCS_OUTPUT_FILE } from './data/API_DOCS_INFO.js';

// Swagger Docs
import swaggerUi from 'swagger-ui-express';
import { SESSION_OPTIONS } from './data/API_SESSION.js';

// -------------------------------------------------------------------------
// |                            APP CONFIG                                 |
// -------------------------------------------------------------------------
// Express app
const app = express();

// Port
const PORT = process.env.APP_PORT || 3333;
app.set('port', PORT);

// -------------------------------------------------------------------------
// |                         SESSION CONFIG                                |
// -------------------------------------------------------------------------

app.use(session(SESSION_OPTIONS));

// -------------------------------------------------------------------------
// |                              SECURITY                                 |
// -------------------------------------------------------------------------

// CORS
app.use(
	cors({
		credentials: true,
		origin: process.env.APP_URL, // true para local? Compatibilidad con navegadores
	}),
);

// Helmet (Security middleware)
app.use(helmet());

// "Marca de agua"
app.set('x-powered-by', 'Unknown Gravity');

// -------------------------------------------------------------------------
// |                              COMPRESSION                              |
// -------------------------------------------------------------------------

// Compresion
app.use(compression());

// File Upload limit
app.use(express.json({ limit: '2048mb' }));
app.use(express.urlencoded({ limit: '2048mb', extended: true }));

// -------------------------------------------------------------------------
// |                                 ROUTES                                |
// -------------------------------------------------------------------------

// Add more routes here
app.use('/user', userRoutes);

// Swagger Docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(DOCS_OUTPUT_FILE));

// DEBEN DE SER SIEMPRE LAS ÚLTIMAS!
app.use(UtilityRoutes);

// Export app
export default app;
