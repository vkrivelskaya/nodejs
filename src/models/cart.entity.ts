import { Entity, PrimaryKey, Property, Collection, OneToMany, ManyToOne } from '@mikro-orm/core';
import { Product } from './product.entity';

@Entity()
export class CartItem {
  @PrimaryKey()
  id!: string;

  @ManyToOne(() => Cart)
  cart!: Cart;

  @ManyToOne(() => Product)
  product!: Product;

  @Property()
  count!: number;
}

@Entity()
export class Cart {
  @PrimaryKey()
  id!: string;

  @Property()
  userId!: string;

  @Property()
  isDeleted: boolean = false;

  @Property()
  total!: number;

  @OneToMany(() => CartItem, item => item.cart, { eager: true })
  items: CartItem[] = [];
}