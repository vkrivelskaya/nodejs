import { Request, Response } from 'express';
import { createOrder as createOrderService } from '../services/order.service';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const order = await createOrderService(req.headers['x-user-id'] as string);

        if (order) {
            return res.status(201).json({data: {order, error: null}});
        } else {
            return res.status(400).json({ data: null,
                error: {
                    message: 'Cart is empty'
                }
            });
        }
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({
            data: null,
            error: {
                message: 'Internal Server error'
            }
        });
    }
  };