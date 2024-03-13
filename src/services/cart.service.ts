import { CartEntity, CartItemEntity } from "../models/cart";
import {getCart as getCartById, deleteCart as deleteCartById, updateCart as update} from "../repositories/cart.repository"
import { getProductById } from '../repositories/product.repository';

export const getCart = async (userId: string): Promise<CartEntity | null> => {
  try {
    const cart: CartEntity | null = await getCartById(userId);
    return cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
};

export const deleteCart = async (userId: string): Promise<boolean> => {
  try {
    const success = await deleteCartById(userId);
    return success;
  } catch (error) {
    console.error('Error deleting cart:', error);
    return false;
  }
};

export const updateCart = async (userId: string, productId: string, count: number): Promise<boolean> => {
    try {
      const currentCart: CartEntity | null = await getCartById(userId);

      if (!currentCart) {
        return false;
      }

      const existingItemIndex = currentCart.items.findIndex((item: CartItemEntity) => item.product.id === productId);

      if (existingItemIndex !== -1) {
        currentCart.items[existingItemIndex].count = count;
      } else {
        const product = await getProductById(productId);
        if(!product) {
            return false;
        }
        const newCartItem: CartItemEntity = {
          product,
          count: count
        };
        currentCart.items.push(newCartItem);
      }

    //   // Update the total price of the cart
    //   const total = currentCart.items.reduce((acc, item) => acc + (item.product.price * item.count), 0);
    //   currentCart.total = total;

      // Update the cart in the database
      const success = await update(userId, currentCart);

      return success;
    } catch (error) {
      console.error('Error updating cart:', error);
      return false;
    }
};