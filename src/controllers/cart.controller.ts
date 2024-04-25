import { Request, Response } from 'express';
import * as Joi from 'joi';
import { getCart as getCartService, deleteCart as deleteCartService, updateCart as updateCartService, createCart as createCartService } from '../services/cart.service';

export const getCart = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.user_id;
        let cart = await getCartService(userId as string);


        if (!cart) {
            cart = await createCartService(userId as string);
        }

        const {total, ...cartWithoutTotal} = cart!;

        return res.status(200).json({ data: { cart: cartWithoutTotal, total }, error: null });
    } catch (error) {
        logger.error('Error getting cart:', error);
        return res.status(500).json({
            data: null,
            error: {
                message: 'Internal Server error'
            }
        });
    }
};

export const deleteCart = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.user_id;
        const success = await deleteCartService(userId);

        if (success) {
            return res.status(200).json({
                data: {
                  success: true
                },
                error: null
            });
        } else {
            return res.status(500).json({
                data: null,
                error: {
                    message: 'Internal Server error'
                }
            });
        }
    } catch (error) {
        logger.error('Error deleting cart:', error);
        return res.status(500).json({
            data: null,
            error: {
                message: 'Internal Server error'
            }
        });
    }
};

const updateCartSchema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().integer().required()
});

export const updateCart = async (req: Request, res: Response) => {
    try {
      const { error } = updateCartSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
            data: null,
            error: {
            message: 'Products are not valid'
        } });
      }


      const { productId, count } = req.body;
      const userId = (req as any).user.user_id;
      const cart = await updateCartService(userId, productId, count);

      if (cart) {
        const {total, ...cartWithoutTotal} = cart!;
        return res.status(200).json({ data: { cart: cartWithoutTotal, total }, error: null });
      } else {
        return res.status(500).json({
            data: null,
            error: {
                message: 'Cart was not found'
            }
        });
      }
    } catch (error) {
      logger.error('Error updating cart:', error);
      return res.status(500).json({
        data: null,
        error: {
            message: 'Internal Server error'
        }
    });
    }
  };