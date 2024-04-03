import { Entity, PrimaryKey, Property, OneToMany } from "@mikro-orm/core";

@Entity()
export class Product {
  @PrimaryKey()
  id!: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;
}
