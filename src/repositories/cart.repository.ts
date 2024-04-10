import { Cart } from '../models/cart.entity';
import {DI} from '../server';

export const getCart = async (userId: string): Promise<Cart | null> => {
    try {
        let cart = await DI.cartRepository.findOne({ user: userId });

        return cart;
    } catch (error) {
        console.error('Error fetching cart data:', error);
        return null;
    }
};

export const updateCart = async (updatedCart: Cart): Promise<boolean> => {
    try {
        await DI.orm.em.persistAndFlush(updatedCart);
        return true;
    } catch (error) {
        console.error('Error updating cart:', error);
        return false;
    }
};

export const deleteCart = async (userId: string): Promise<boolean> => {
    try {
        const cart = await DI.cartRepository.findOne({ user: userId });
        if (!cart) return false;
        await DI.orm.em.removeAndFlush(cart);
        return true;
    } catch (error) {
        console.error('Error deleting cart:', error);
        return false;
    }
};

export const createCart = async (newCart: Cart): Promise<boolean> => {
    try {
        await DI.orm.em.persistAndFlush(newCart);
        return true;
    } catch (error) {
        console.error('Error creating cart:', error);
        return false;
    }
};