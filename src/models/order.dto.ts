import { CartItemDTO } from "./cart-item.dto";

type ORDER_STATUS = 'created' | 'completed';

export interface OrderDto {
    id: string,
    userId: string;
    cartId: string;
    items: CartItemDTO[]
    payment: {
        type: string,
        address?: any,
        creditCard?: any,
    },
    delivery: {
        type: string,
        address: any,
    },
    comments: string,
    status: ORDER_STATUS;
    total: number
}