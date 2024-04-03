import { Cart, CartItem } from "../models/cart.entity";
import {getCart as getCartById, deleteCart as deleteCartById, updateCart as update, createCart as create} from "../repositories/cart.repository"
import { getProductById } from '../repositories/product.repository';


export const getCart = async (userId: string): Promise<Cart | null> => {
    try {
        const cart: Cart | null = await getCartById(userId);
        if (cart) {
            //cart.total = cart.items.reduce((acc, item) => acc + (item.product.price * item.count), 0);
        }
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


export const updateCart = async (userId: string, productId: string, count: number): Promise<Cart | null> => {
  try {
    let currentCart: Cart | null = await getCartById(userId);

    if (!currentCart) {
      return null;
    }

    let cartItem = currentCart.items.find(item => item.product.id === productId);

    if (cartItem) {
      cartItem.count += count;
    } else {
      const product = await getProductById(productId);
      if (!product) {
        return null;
      }

      cartItem = {
        product: product,
        count: count,
        cart: currentCart,
        id: crypto.randomUUID(),
      };

      currentCart.items.push(cartItem);
    }

    currentCart.total = currentCart.items.reduce((acc, item) => acc + (item.product.price * item.count), 0);

    await update(currentCart);

    return currentCart;
  } catch (error) {
    console.error('Error updating cart:', error);
    return null;
  }
};


export const createCart = async (userId: string): Promise<Cart | null> => {
    try {
      const newCart = new Cart();
      newCart.id = crypto.randomUUID();
      newCart.userId = userId;
      newCart.items = [];
      newCart.isDeleted = false;
      newCart.total = 0;
      await create(newCart);

      return newCart;
    } catch (error) {
      console.error('Error creating cart:', error);
      return null;
    }
  };

