import express from 'express';
import { deleteCart, getCart, updateCart } from '../controllers/cart.controller';
import { createOrder } from '../controllers/order.controller';
import { authenticateUser } from '../middleware/auth.middleware';

export const cartRouter = express.Router();

cartRouter.get('/', authenticateUser, getCart)
cartRouter.put('/', authenticateUser, updateCart)
cartRouter.post('/checkout', authenticateUser, createOrder)
cartRouter.delete('/',authenticateUser, deleteCart)