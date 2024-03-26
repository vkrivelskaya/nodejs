import mongoose, { Document, Schema } from "mongoose";
import { CartItemEntity } from "./cart";

type ORDER_STATUS = 'created' | 'completed';

export interface OrderEntity extends Document {
  id: string,
  userId: string;
  cartId: string;
  items: CartItemEntity[] // products from CartEntity
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
  total: number;
}

const OrderSchema: Schema = new Schema({
  id: { type: Schema.Types.UUID, required: true },
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: [{
    product: {
      type: {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
      },
      required: true
    },
    count: { type: Number, required: true }
  }],
  payment: {
    type: { type: String, required: true },
    address: { type: Schema.Types.Mixed },
    creditCard: { type: Schema.Types.Mixed },
  },
  delivery: {
    type: { type: String, required: true },
    address: { type: Schema.Types.Mixed, required: true },
  },
  comments: { type: String },
  status: { type: String, enum: ['created', 'completed'], required: true },
  total: { type: Number, required: true },
});

export default mongoose.model<OrderEntity>('Order', OrderSchema);

