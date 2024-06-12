import { CartItemEntity, CartWithTotal } from "../models/cart";
import {getCart as getCartById, deleteCart as deleteCartById, updateCart as update, createCart as create} from "../repositories/cart.repository"
import { getProductById } from '../repositories/product.repository';

export const getCart = async (userId: string): Promise<CartWithTotal | null> => {
    try {
        const cart: CartWithTotal | null = await getCartById(userId);
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
        const success = await deleteCartById(userId);
        return success;
    } catch (error) {
        console.error('Error deleting cart:', error);
        return false;
    }
};

export const updateCart = async (userId: string, productId: string, count: number): Promise<CartWithTotal | null> => {
    try {
        const currentCart: CartWithTotal | null = await getCartById(userId);

        if (!currentCart) {
            return null;
        }

        if (count === 0) {
            currentCart.items = currentCart.items.filter(item => item.product.id !== productId)

        } else {
            const existingItemIndex = currentCart.items.findIndex((item: CartItemEntity) => item.product.id === productId);

            if (existingItemIndex !== -1) {
                currentCart.items[existingItemIndex].count = count;
            } else {
                const product = await getProductById(productId);
                if(!product) {
                    return null;
                }
                const newCartItem: CartItemEntity = {
                    product: product,
                    count: count
                } as CartItemEntity;
                currentCart.items.push(newCartItem);
            }
        }

        currentCart.total = currentCart.items.reduce((acc, item) => acc + (item.product.price * item.count), 0);

        await update(userId, currentCart);

        return currentCart;
    } catch (error) {
        console.error('Error updating cart:', error);
        return null;
    }
};

export const createCart = async (userId: string): Promise<CartWithTotal | null> => {
    try {
        const newCart: CartWithTotal = {
            id: crypto.randomUUID(),
            userId: userId,
            items: [] as CartItemEntity[],
            isDeleted: false,
            total: 0
        } as CartWithTotal;

        await create(newCart);
        return newCart;
    } catch (error) {
        console.error('Error creating cart:', error);
        return null;
    }
};

