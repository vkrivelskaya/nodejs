import { Entity, PrimaryKey, Property, Collection, OneToMany, ManyToOne, OneToOne} from '@mikro-orm/core';
import { CartItem } from './cart-item.entity';
import { Order } from './order.entity';
import { User } from './user.entity';

// @Entity()
// export class Cart {
//   @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
//   uuid!: string;

//   @OneToOne(() => User)
//   user!: User;

//   @Property()
//   total!: number;

//   @OneToMany(() => CartItem, item => item.cart, { eager: true })
//   items = new Collection<CartItem>(this)

//   constructor(user: User, total: number) {
//     this.user = user;
//     this.total = total;
//   }
// }

@Entity()
export class Cart {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid!: string;

  @OneToOne(() => User)
  user!: User;

  @OneToMany(() => CartItem, item => item.cart)
  items = new Collection<CartItem>(this);

  @OneToMany(() => Order, order => order.cart)
  orders = new Collection<Order>(this);

  @Property()
  total!: number;

  constructor(user: User, total: number) {
    this.user = user;
    this.total = total;
  }
}