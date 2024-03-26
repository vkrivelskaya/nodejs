import { OrderEntity } from '../models/order';
import Order from '../models/order';

export const createOrder = async (order: OrderEntity): Promise<boolean> => {
  try {
    const newOrder = new Order(order);
    await newOrder.save();
    return true;
  } catch (error) {
    console.error('Error creating order:', error);
    return false;
  }
};