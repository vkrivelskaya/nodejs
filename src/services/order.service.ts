import { OrderEntity } from '../models/order';
import { createOrder as createOrderInRepository } from '../repositories/order.repository';
import { deleteCart } from '../repositories/cart.repository';

export const createOrder = async (order: OrderEntity): Promise<boolean> => {
    try {
      const success = await createOrderInRepository(order);
      if (success) {
        await deleteCart(order.userId);
      }
      return success;
    } catch (error) {
      console.error('Error creating order:', error);
      return false;
    }
};