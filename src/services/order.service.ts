import { OrderEntity } from '../models/order';
import { createOrder as createOrderInRepository } from '../repositories/order.repository';
import { deleteCart } from '../repositories/cart.repository';
import { CartWithTotal } from '../models/cart';
import { getCart } from './cart.service';
import logger from '../logger';

export const createOrder = async (userId: string): Promise<OrderEntity | null> => {
    try {
        const cart: CartWithTotal | null = await getCart(userId);

        if (!cart || cart.items.length === 0) {
            logger.error('Cart is empty or does not exist');
            return null;
        }
        const total = cart.items.reduce((acc, item) => acc + (item.product.price * item.count), 0);

        const order: OrderEntity = {
            id: crypto.randomUUID(),
            userId: userId,
            cartId: cart.id,
            items: cart.items,
            payment: { type: 'paypal', address: 'London', creditCard: '1234-1234-1234-1234' },
            delivery: { type: 'post', address: 'London' },
            comments: '',
            status: 'created',
            total: total
        } as OrderEntity;


        const success = await createOrderInRepository(order);

        if (success) {
            await deleteCart(userId);
        }

        return order;
    } catch (error) {
        logger.error('Error creating order:', error);
        return null;
    }
  };