import { OrderEntity } from '../models/order';
import Order from '../models/order';
import logger from '../logger';

export const createOrder = async (order: OrderEntity): Promise<boolean> => {
  try {
    const newOrder = new Order(order);
    await newOrder.save();
    return true;
  } catch (error) {
    logger.error('Error creating order:', error);
    return false;
  }
};