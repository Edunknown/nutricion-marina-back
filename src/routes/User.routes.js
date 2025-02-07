import express from 'express';
import UserController from '../controllers/User.controller.js';
import { autoDecodeToken } from '../middleware/DecodeToken.js';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/login', autoDecodeToken, UserController.login);
router.get('/:id', UserController.getUserById);

export default router;
