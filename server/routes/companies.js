import express from 'express';
import * as companiesController from '../controllers/companiesController.js';

const router = express.Router();

router.get('/', companiesController.getAllCompanies);

export default router;