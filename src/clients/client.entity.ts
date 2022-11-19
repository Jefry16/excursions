import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  country: string;

  @Column()
  phone: string;
  
  @ManyToOne(() => User, (user) => user.tours, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;

  //   @ManyToOne(() => Provider, (provider) => provider.tours, {
  //     onDelete: 'SET NULL',
  //   })
  //   @JoinColumn()
  //   provider: Provider;
}
