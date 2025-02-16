import express from 'express';
import DietController from '../controllers/Diet.controller.js';

const router = express.Router();

router.get('/:dietId', DietController.getDietInfo);

export default router;
