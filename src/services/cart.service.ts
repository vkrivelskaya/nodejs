import { CartItem } from "../models/cart-item.entity";
import { Cart} from "../models/cart.entity";
import {getCart as getCartById, deleteCart as deleteCartById, updateCart as update, createCart as create} from "../repositories/cart.repository"
import { getProductById } from '../repositories/product.repository';
import { getUser } from "./users.service";


export const getCart = async (userId: string): Promise<Cart | null> => {
    try {
        const cart: Cart | null = await getCartById(userId);
        if (cart) {
            cart.total = cart.items.reduce((acc, item) => acc + (item.product.price * item.count), 0);
        }
        return cart;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return null;
    }
};


export const deleteCart = async (userId: string): Promise<boolean> => {
  try {
      const cart = await getCart(userId);
      if (!cart) {
          console.error('Cart not found');
          return false;
      }

      cart.items.removeAll();

      await update(cart);

      return true;
  } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
  }
};


export const updateCart = async (userId: string, productId: string, count: number): Promise<Cart | null> => {
  try {
    let currentCart: Cart | null = await getCart(userId);

    if (!currentCart) {
      return null;
    }

    let cartItem = currentCart.items.getItems().find(item => item.product.uuid === productId);

    if (cartItem) {
      cartItem.count += count;
    } else {
      const product = await getProductById(productId);
      if (!product) {
        return null;
      }

      const newCartItem: CartItem = {
        product: product,
        count: count,
        uuid: crypto.randomUUID(),
        cart: currentCart,
      };

      currentCart.items.add(newCartItem);
    }

    currentCart.total = currentCart.items.getItems().reduce((acc, item) => acc + (item.product.price * item.count), 0);

    await update(currentCart);

    return currentCart;
  } catch (error) {
    console.error('Error updating cart:', error);
    return null;
  }
};