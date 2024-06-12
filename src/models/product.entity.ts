import { Entity, PrimaryKey, Property, OneToMany, Collection } from "@mikro-orm/core";
import { CartItem } from "./cart-item.entity";

@Entity()
export class Product {
  @PrimaryKey({type: 'uuid'})
  uuid!: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;

  @OneToMany(() => CartItem, item => item.product)
  items = new Collection<CartItem>(this);

  constructor(title: string, description: string, price: number) {
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
