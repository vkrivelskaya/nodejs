import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Cart } from "./cart.entity";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity()
export class CartItem {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid!: string;

  @ManyToOne(() => Cart)
  cart!: Cart;

  @ManyToOne(() => Product)
  product!: Product;

  @ManyToOne(() => Order, { nullable: true })
  order?: Order;

  @Property()
  count!: number;

  constructor(count: number) {
    this.count = count;
  }
}