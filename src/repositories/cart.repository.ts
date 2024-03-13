import fs from 'fs';
import path from 'path';
import { CartEntity } from '../models/cart';

const CART_DB_FILE = path.resolve(__dirname, 'cart.db.json');

export const getCart = async (userId: string): Promise<CartEntity | null> => {
  try {
    const data = await fs.promises.readFile(CART_DB_FILE, 'utf8');
    const carts: CartEntity[] = JSON.parse(data);
    const userCart = carts.find(cart => cart.userId === userId);
    return userCart || null;
  } catch (error) {
    console.error('Error fetching cart data:', error);
    return null;
  }
};

export const updateCart = async (userId: string, updatedCart: CartEntity): Promise<boolean> => {
  try {
    const data = await fs.promises.readFile(CART_DB_FILE, 'utf8');
    const carts: CartEntity[] = JSON.parse(data);
    const index = carts.findIndex(cart => cart.userId === userId);

    if (index !== -1) {
      carts[index] = updatedCart;
    } else {
      carts.push(updatedCart);
    }

    await fs.promises.writeFile(CART_DB_FILE, JSON.stringify(carts, null, 2));
    return true;
  } catch (error) {
    console.error('Error updating cart:', error);
    return false;
  }
};

export const deleteCart = async (userId: string): Promise<boolean> => {
  try {
    const data = await fs.promises.readFile(CART_DB_FILE, 'utf8');
    let carts: CartEntity[] = JSON.parse(data);
    carts = carts.filter(cart => cart.userId !== userId);
    await fs.promises.writeFile(CART_DB_FILE, JSON.stringify(carts, null, 2));
    return true;
  } catch (error) {
    console.error('Error deleting cart:', error);
    return false;
  }
};