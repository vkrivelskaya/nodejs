import { initializeMikroORM } from '../micro-orm';
import { Cart } from '../models/cart.entity';

export const getCart = async (userId: string): Promise<Cart | null> => {
    try {
        const mikroOrm = await initializeMikroORM();
        const em = mikroOrm.em;
        return await em.findOne(Cart, {userId });
    } catch (error) {
        console.error('Error fetching cart data:', error);
        return null;
    }
};

export const updateCart = async (updatedCart: Cart): Promise<boolean> => {
    try {
        const mikroOrm = await initializeMikroORM();
        const em = mikroOrm.em;
        await em.persistAndFlush(updatedCart);
        return true;
    } catch (error) {
        console.error('Error updating cart:', error);
        return false;
    }
};

export const deleteCart = async (userId: string): Promise<boolean> => {
    try {
        const mikroOrm = await initializeMikroORM();
        const em = mikroOrm.em;
        const cart = await em.findOne(Cart, { userId });
        if (!cart) return false;

        cart.isDeleted = true;
        await em.persistAndFlush(cart);

        return true;
    } catch (error) {
        console.error('Error deleting cart:', error);
        return false;
    }
};

export const createCart = async (newCart: Cart): Promise<boolean> => {
    try {
        const mikroOrm = await initializeMikroORM();
        const em = mikroOrm.em;
        await em.persistAndFlush(newCart);
        return true;
    } catch (error) {
        console.error('Error creating cart:', error);
        return false;
    }
};