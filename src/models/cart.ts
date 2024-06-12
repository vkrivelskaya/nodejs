import { ProductEntity } from "./product";

export interface CartItemEntity {
    product: ProductEntity;
    count: number;
}

export interface CartEntity {
    id: string; // uuid
    userId: string;
    isDeleted: boolean;
    items: CartItemEntity[];
}

export interface CartWithTotal extends CartEntity {
    total?: number;
}
