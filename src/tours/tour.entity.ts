import { Booking } from '../bookings/bookings.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from '../providers/provider.entity';
import { User } from '../users/user.entity';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  priceAdult: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  priceKid: number;

  @ManyToOne(() => User, (user) => user.tours, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Provider, (provider) => provider.tours, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  provider: Provider;

  @OneToMany(() => Booking, (bookings) => bookings.tour)
  bookings: Booking[];
}
