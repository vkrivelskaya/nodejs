import { Entity, PrimaryKey, Property, OneToMany } from "@mikro-orm/core";

@Entity()
export class Product {
  @PrimaryKey({type: 'uuid', defaultRaw: 'uuid_generate_v4()'})
  uuid!: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;

  constructor(title: string, description: string, price: number) {
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
