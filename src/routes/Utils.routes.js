import express from 'express';
import UtilsController from '../controllers/Utils.controller.js';

const router = express.Router();

// Default route for the API
router.get('/', UtilsController.defaultController);

// Ping route for the API
router.get('/ping', UtilsController.pingController);

// 404
router.all('*', UtilsController.error404Controller);

export default router;
