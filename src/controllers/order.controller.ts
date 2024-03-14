import { Request, Response } from 'express';
import { createOrder as createOrderService } from '../services/order.service';

export const createOrder = async (req: Request, res: Response) => {
    try {
      const success = await createOrderService(req.headers['x-user-id'] as string);

      if (success) {
        return res.status(201).json({ message: 'Order created successfully' });
      } else {
        return res.status(500).json({ error: 'Failed to create order' });
      }
    } catch (error) {
      console.error('Error creating order:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };