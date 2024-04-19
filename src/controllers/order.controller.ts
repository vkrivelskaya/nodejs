import { Request, Response } from 'express';
import { createOrder as createOrderService } from '../services/order.service';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.user_id;
        const order = await createOrderService(userId);

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