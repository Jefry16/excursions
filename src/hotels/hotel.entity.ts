import { Booking } from '../bookings/bookings.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @OneToMany(() => Booking, (booking) => booking.hotel)
  bookings: Booking[];

  @AfterInsert()
  afterInsert() {}

  @AfterUpdate()
  afterUpdate() {}

  @AfterRemove()
  afterRemove() {}
}
