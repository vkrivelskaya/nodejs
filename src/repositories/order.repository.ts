import { Order } from "../models/order.entity";
import {DI} from '../server';

export const createOrder = async (order: Order): Promise<boolean> => {
    try {
        await DI.orm.em.persistAndFlush(order);
        return true;
    } catch (error) {
        console.error('Error creating order:', error);
        return false;
    }
};