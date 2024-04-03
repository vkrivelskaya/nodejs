import { initializeMikroORM } from "../micro-orm";
import { Order } from "../models/order.entity";
import { User } from "../models/user.entity";

export const createOrder = async (order: Order, userId: string): Promise<boolean> => {
    try {
        const mikroOrm = await initializeMikroORM();
        const em = mikroOrm.em;
        order.user = await em.getReference(User, userId);
        await em.persistAndFlush(order);
        return true;
    } catch (error) {
        console.error('Error creating order:', error);
        return false;
    }
};