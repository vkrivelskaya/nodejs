import { Request, Response } from 'express';
import * as Joi from 'joi';
import { getCartDto as getCartService, deleteCart as deleteCartService, updateCart as updateCartService, createCart as createCartService } from '../services/cart.service';

export const getCart = async (req: Request, res: Response) => {
    try {
        const userId = req.headers['x-user-id'];
        let cart = await getCartService(userId as string);

        if (!cart) {
            cart = await createCartService(userId as string);
        }

        if (cart) {
            return res.status(200).json({ data: cart, error: null });
        } else {
            return res.status(404).json({ data: null, error: { message: 'Cart not found' } });
        }
    } catch (error) {
        console.error('Error getting cart:', error);
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
        const success = await deleteCartService(req.headers['x-user-id'] as string);

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
        console.error('Error deleting cart:', error);
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
    count: Joi.number().integer().min(0).required()
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
      const cart = await updateCartService(req.headers['x-user-id'] as string, productId, count);

      if (cart) {
        return res.status(200).json({ data: cart, error: null });
      } else {
        return res.status(500).json({
            data: null,
            error: {
                message: 'Cart was not found'
            }
        });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      return res.status(500).json({
        data: null,
        error: {
            message: 'Internal Server error'
        }
    });
    }
  };