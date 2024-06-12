import fs from 'fs';
import path from 'path';
import { OrderEntity } from '../models/order';

const ORDERS_DB_FILE = path.resolve(__dirname, '../db', 'order.db.json');

export const createOrder = async (order: OrderEntity): Promise<boolean> => {
  try {
    const data = await fs.promises.readFile(ORDERS_DB_FILE, 'utf8');
    const orders: OrderEntity[] = JSON.parse(data);
    orders.push(order);
    await fs.promises.writeFile(ORDERS_DB_FILE, JSON.stringify(orders, null, 2));
    return true;
  } catch (error) {
    console.error('Error creating order:', error);
    return false;
  }
};