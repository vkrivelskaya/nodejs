import { CartItemDTO } from "./cart-item.dto";

export interface CartDTO {
    cart: {
        id: string;
        items: CartItemDTO[];
    },
    total: number;
}