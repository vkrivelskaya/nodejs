import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { Cart, CartItem } from "./cart.entity";
import { User } from "./user.entity";

type ORDER_STATUS = 'created' | 'completed';

@Entity()
export class Order {
  @PrimaryKey({type: 'uuid', defaultRaw: 'uuid_generate_v4()'})
  uuid!: string;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Cart)
  cart!: Cart;

  @OneToMany(() => CartItem, item => item.product)
  items = new Collection<CartItem>(this);

  @Property()
  paymentType!: string;

  @Property()
  paymentAddress?: any;

  @Property()
  creditCard?: any;

  @Property()
  deliveryType!: string;

  @Property()
  deliveryAddress!: any;

  @Property()
  comments!: string;

  @Property()
  status!: ORDER_STATUS;

  @Property()
  total!: number;

  constructor(
    paymentType: string,
    paymentAddress: any,
    creditCard: any,
    deliveryType: string,
    deliveryAddress: string,
    comments: string,
    status: ORDER_STATUS,
    total: number
  ) {
    this.paymentType = paymentType;
    this.paymentAddress = paymentAddress;
    this.creditCard = creditCard;
    this.deliveryType = deliveryType;
    this.deliveryAddress = deliveryAddress;
    this.comments = comments;
    this.status = status;
    this.total = total
  }
}