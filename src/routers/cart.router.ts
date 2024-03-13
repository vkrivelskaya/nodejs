import express from 'express';
import { authenticateUser } from '../middleware/auth.middleware';

export const cartRouter = express.Router();

cartRouter.get('/', authenticateUser, httpGetCart)
cartRouter.put('/', authenticateUser, httpUpdateCart)
cartRouter.post('/checkout', authenticateUser, httpCreateOrder)
cartRouter.delete('/',authenticateUser, httpDeleteCart)