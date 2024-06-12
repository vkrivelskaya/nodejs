import mongoose, { Document, Schema } from "mongoose";
import { ProductEntity } from "./product";

export interface CartItemEntity {
    product: ProductEntity;
    count: number;
}

export interface CartEntity {
    id: string;
    userId: string;
    isDeleted: boolean;
    items: CartItemEntity[];
}

export interface CartWithTotal extends CartEntity {
    total?: number;
}


const CartSchema: Schema = new Schema({
    id: { type: Schema.Types.UUID, required: true },
    userId:  { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
    items: [{ product: {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
      }, count: Number }],
    total: { type: Number }
});

export default mongoose.model<CartWithTotal>('Cart', CartSchema);