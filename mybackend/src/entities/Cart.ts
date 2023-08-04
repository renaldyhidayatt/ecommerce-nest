import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @Column()
  name: string;

  @Column()
  price: string;

  @ManyToOne(() => User, (user) => user.cartItems) // Many carts belong to one user
  user: User;

  @Column()
  image: string;

  @Column()
  quantity: number;

  @Column()
  weight: number;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product?: Product;
}
