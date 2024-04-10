import { createOrder as createOrderInRepository } from '../repositories/order.repository';
import { deleteCart, getCart } from './cart.service';
import { Cart} from '../models/cart.entity';
import { Order } from '../models/order.entity';
import { Collection } from '@mikro-orm/core';
import { CartItem } from '../models/cart-item.entity';
import { OrderDto } from '../models/order.dto';
import { CartItemDTO } from '../models/cart-item.dto';
import { getProductById } from './product.service';

export const createOrder = async (userId: string): Promise<OrderDto | null> => {
    try {
        const cart: Cart | null = await getCart(userId);

        if (!cart) {
            console.error('Cart does not exist');
            return null;
        }

        await cart.items.init();

        if (cart.items.length === 0) {
            console.error('Cart is empty');
            return null;
        }

        const order: Order = new Order(
            'paypal',
            'London',
            '',
            'post',
            'London',
            '',
            'created',
        );

        order.user = cart.user;
        order.id = crypto.randomUUID();
        order.cart = cart;
        order.items = new Collection<CartItem, object>(order, cart.items.getItems());
        await createOrderInRepository(order);
        await deleteCart(userId);

        return enrichOrderWithItems(order);
    } catch (error) {
        console.error('Error creating order:', error);
        return null;
    }
};

export const enrichOrderWithItems = async (order: Order): Promise<OrderDto> => {
    if (!order.items.isInitialized()) {
      await order.items.init();
    }
    const orderItems = order.items.getItems();
    const itemsResponse: CartItemDTO[] = [];

    for (const cartItem of orderItems) {
        const product = await getProductById(cartItem.product.uuid);
        if (product) {
          const {uuid, items, ...clearProduct} = product;
          itemsResponse.push({product: {id: cartItem.product.uuid, ...clearProduct}, count: cartItem.count});
        }
    }

    const total = itemsResponse.reduce((acc, item) => acc + (item.product.price * item.count), 0)
    const orderResponse = {
        id: order.id,
        userId: order.user.uuid,
        cartId: order.cart.uuid,
        items: itemsResponse,
        payment: {
            type: order.paymentType,
            addres: order.paymentAddress,
            creditCard: order.creditCard,
        },
        delivery: {
            type: order.deliveryType,
            address: order.deliveryAddress,
        },
        comments: order.comments,
        status: order.status,
        total: total

    }
    return orderResponse;
};
