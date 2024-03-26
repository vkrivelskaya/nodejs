import mongoose, { Document, Schema } from "mongoose";

export interface ProductEntity {
    id: string;
    title: string;
    description: string;
    price: number;
}


export const ProductSchema: Schema = new Schema({
    _id: { type: Schema.Types.UUID, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});

export default mongoose.model<ProductEntity>('Product', ProductSchema);