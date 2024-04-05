import { Entity, PrimaryKey, Property, Collection, OneToMany, ManyToOne, OneToOne} from '@mikro-orm/core';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity()
export class CartItem {
  @PrimaryKey({type: 'uuid', defaultRaw: 'uuid_generate_v4()'})
  uuid!: string;

  @ManyToOne(() => Cart)
  cart!: Cart;

  @ManyToOne(() => Product)
  product!: Product;

  @Property()
  count!: number;

  constructor(
    count: number
  ) {
    this.count = count;
  }
}

@Entity()
export class Cart {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid!: string;

  @OneToOne(() => User)
  user!: User;

  @Property()
  total!: number;

  @OneToMany(() => CartItem, item => item.cart, { eager: true })
  items = new Collection<CartItem>(this)

  constructor(user: User, total: number) {
    this.user = user;
    this.total = total;
  }
}