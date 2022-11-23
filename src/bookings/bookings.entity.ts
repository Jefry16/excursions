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
import { Hotel } from '../hotels/hotel.entity';

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

  @Column({ default: 0 })
  discount: number;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Tour, (tour) => tour.bookings, { onDelete: 'SET NULL' })
  @JoinColumn()
  tour: Tour;

  @ManyToOne(() => Client, (client) => client.bookings, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  client: Client;

  @ManyToOne(() => Hotel, (hotel) => hotel.bookings, { onDelete: 'SET NULL' })
  @JoinColumn()
  hotel: Hotel;
}
