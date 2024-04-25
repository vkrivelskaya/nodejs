import { CartWithTotal } from '../models/cart';
import Cart from '../models/cart';

export const getCart = async (userId: string): Promise<CartWithTotal | null> => {
    try {
        const userCart = await Cart.findOne({ userId },  {_id:0, id: 1, userId: 1, items: 1, total: 1, });
        return userCart
        ? {
            id: userCart.id,
            userId: userCart.userId,
            isDeleted: userCart.isDeleted,
            items: userCart.items.map(item => ({product: {
                id: item.product.id,
                title: item.product.title,
                description: item.product.description,
                price: item.product.price,
            }, count: item.count})),
            total: userCart.total
        }
        : null;
    } catch (error) {
        logger.error('Error fetching cart data:', error);
        return null;
    }
};

export const updateCart = async (userId: string, updatedCart: CartWithTotal): Promise<boolean> => {
    try {
        await Cart.updateOne({ userId }, {...updatedCart}, { upsert: true });
        return true;
    } catch (error) {
        logger.error('Error updating cart:', error);
        return false;
    }
};

export const deleteCart = async (userId: string): Promise<boolean> => {
    try {
        await Cart.updateOne({ userId }, { items: [] });
        return true;
    } catch (error) {
        logger.error('Error deleting cart:', error);
        return false;
    }
};

export const createCart = async (newCart: CartWithTotal): Promise<boolean> => {
    try {
        const userId = newCart.userId;
        const cart = new Cart({ ...newCart, userId });
        await cart.save();
        return true;
    } catch (error) {
        logger.error('Error creating cart:', error);
        return false;
    }
};