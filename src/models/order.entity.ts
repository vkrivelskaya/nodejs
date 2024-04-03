import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { Cart, CartItem } from "./cart.entity";
import { User } from "./user.entity";

type ORDER_STATUS = 'created' | 'completed';

@Entity()
export class Order {
  @PrimaryKey()
  id!: string;

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
}