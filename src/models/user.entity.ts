import { Entity, PrimaryKey, OneToMany, Collection } from '@mikro-orm/core';
import { Cart } from './cart.entity';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid!: string;

  @OneToMany(() => Cart, cart => cart.user)
  carts = new Collection<Cart>(this);
}
