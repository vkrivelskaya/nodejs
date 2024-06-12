import { CartItemDTO } from "../models/cart-item.dto";
import { CartItem } from "../models/cart-item.entity";
import { CartDTO } from "../models/cart.dto";
import { Cart} from "../models/cart.entity";
import {getCart as getCartById, updateCart as update, createCart as create, } from "../repositories/cart.repository"
import { getProductById } from '../repositories/product.repository';
import { getUser } from "./users.service";

export const getCart = async (userId: string): Promise<Cart | null> => {
    try {
        const cart: Cart | null = await getCartById(userId);

        return cart ;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return null;
    }
};

export const getCartDto = async (userId: string): Promise<CartDTO | null> => {
  const cart = await getCart(userId)
  return cart ? enrichCartWithProductDetails(cart) : cart
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


export const updateCart = async (userId: string, productId: string, count: number): Promise<CartDTO | null> => {
  try {
    let currentCart: Cart | null = await getCartById(userId);

    if (!currentCart) {
      return null;
    }

    if (!currentCart.items.isInitialized()) {
      await currentCart.items.init();
    }

    let cartItem = currentCart.items.getItems().find(item => item.product.uuid === productId);

    if (cartItem) {
      cartItem.count = count;
      if (cartItem.count === 0) {
        currentCart.items.remove(cartItem);
    }
    } else {
      const product = await getProductById(productId);
      if (!product) {
        return null;
      }

      const newCartItem: CartItem = new CartItem(count);
      newCartItem.product = product;
      newCartItem.uuid = crypto.randomUUID();
      newCartItem.cart = currentCart;

      currentCart.items.add(newCartItem);
    }

    await update(currentCart);

    return enrichCartWithProductDetails(currentCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    return null;
  }
};

export const createCart = async (userId: string): Promise<CartDTO | null> => {
  try {
    const user = await getUser(userId);
    if(user) {
      const cart = new Cart(user);
      cart.uuid = crypto.randomUUID();
      await create(cart);

      const cartResponse = {
        cart: {
          id: cart.uuid,
          items: []
        },
        total: 0
      }

      return cartResponse;
    }
    return null;
  } catch (error) {
    console.error('Error creating cart:', error);
    return null;
  }
};

export const enrichCartWithProductDetails = async (cart: Cart): Promise<CartDTO> => {
  if (!cart.items.isInitialized()) {
    await cart.items.init();
  }
  const cartItems = cart.items.getItems();
  const itemsResponse: CartItemDTO[] = [];

  for (const cartItem of cartItems) {
      const product = await getProductById(cartItem.product.uuid);
      if (product) {
        const {uuid, items, ...clearProduct} = product;
        itemsResponse.push({product: {id: cartItem.product.uuid, ...clearProduct}, count: cartItem.count});
      }
  }

  const total = itemsResponse.reduce((acc, item) => acc + (item.product.price * item.count), 0)
  const cartResponse = {
    cart: {
      id: cart.uuid,
      items: itemsResponse
    },
    total
  }
  return cartResponse;
};