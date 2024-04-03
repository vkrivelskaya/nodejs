import { Entity, PrimaryKey, OneToMany, Collection } from '@mikro-orm/core';
import { Cart } from './cart.entity';

@Entity()
export class User {
  @PrimaryKey()
  id!: string;

  @OneToMany(() => Cart, cart => cart.userId)
  carts = new Collection<Cart>(this);
}


// export interface UserEntity {
//     id: string; // uuid
//   }

//   const user: UserEntity = {
//     id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
//   }

