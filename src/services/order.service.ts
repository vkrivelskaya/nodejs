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

      const order: Order = new Order();
      order.cart = cart;

      order.items = new Collection<CartItem, object>(order, cart.items);

      order.paymentType = 'paypal';
      order.paymentAddress = 'London';
      order.deliveryType = 'post';
      order.deliveryAddress = 'London';
      order.comments = '';
      order.status = 'created';
      order.total = total;

      await createOrderInRepository(order, userId);
      await deleteCart(userId);

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  };