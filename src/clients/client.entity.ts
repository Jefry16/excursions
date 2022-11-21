import { Booking } from '../bookings/bookings.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Booking, (booking) => booking.client)
  bookings: Booking[];
}
