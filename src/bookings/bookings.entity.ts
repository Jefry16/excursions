import { User } from '../users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tour } from '../tours/tour.entity';
import { Client } from '../clients/client.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adults: number;

  @Column({ default: 0 })
  kids: number;

  @Column({ default: 0 })
  babies: number;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column()
  date: Date;

  @Column({ nullable: true })
  roomNumber: string;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Tour, (tour) => tour.bookings, { onDelete: 'SET NULL' })
  @JoinColumn()
  tour: Tour;

  @ManyToOne(() => Client, (client) => client.bookings, { onDelete: 'SET NULL' })
  @JoinColumn()
  client: Client;

  /**todo
   * add hotel, tour,
   */
}
