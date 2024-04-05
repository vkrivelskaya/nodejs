import { createOrder as createOrderInRepository } from '../repositories/order.repository';
import { deleteCart } from '../repositories/cart.repository';
import { getCart } from './cart.service';
import { Cart, CartItem } from '../models/cart.entity';
import { Order } from '../models/order.entity';
import { Collection } from '@mikro-orm/core';

export const createOrder = async (userId: string): Promise<Order | null> => {
  try {
      const cart: Cart | null = await getCart(userId);

      if (!cart || cart.items.length === 0) {
          console.error('Cart is empty or does not exist');
          return null;
      }

      const total = cart.items.reduce((acc, item) => acc + (item.product.price * item.count), 0);
      const order: Order = new Order(
          'paypal',
          'London',
          '',
          'post',
          'London',
          '',
          'created',
          total
      );

      order.user = cart.user;
      order.items = new Collection<CartItem, object>(order, cart.items.getItems());
      await createOrderInRepository(order);
      await deleteCart(userId);

      return order;
  } catch (error) {
      console.error('Error creating order:', error);
      return null;
  }
};