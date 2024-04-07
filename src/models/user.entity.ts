import { Entity, PrimaryKey, OneToMany, Collection, OneToOne } from '@mikro-orm/core';
import { Cart } from './cart.entity';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid!: string;

  @OneToOne(() => Cart, cart => cart.user)
  cart?: Cart;
}
