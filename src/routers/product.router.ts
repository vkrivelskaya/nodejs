import express from 'express';
import { getAllProductsController, getProductByIdController } from '../controllers/product.controller';
import { authenticateUser } from '../middleware/auth.middleware';

export const productRouter = express.Router();

productRouter.get('/', authenticateUser,  getAllProductsController)
productRouter.get('/:id', authenticateUser, getProductByIdController)