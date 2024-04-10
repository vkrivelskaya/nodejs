import { Entity, PrimaryKey, Property, Collection, OneToMany, ManyToOne, OneToOne, Cascade} from '@mikro-orm/core';
import { CartItem } from './cart-item.entity';
import { Order } from './order.entity';
import { User } from './user.entity';

@Entity()
export class Cart {
  @PrimaryKey({ type: 'uuid'})
  uuid!: string;

  @OneToOne(() => User)
  user!: User;

  @OneToMany(() => CartItem, item => item.cart, { cascade: [Cascade.ALL] })
  items = new Collection<CartItem>(this);

  @OneToMany(() => Order, order => order.cart)
  orders = new Collection<Order>(this);

  constructor(user: User) {
    this.user = user;
  }
}