import express from 'express';
import { healthCheck } from '../controllers/health.controller';

export const healthRouter = express.Router();

healthRouter.get('/', healthCheck);