import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  created: Date;

  @Column()
  date: Date;

  @Column({ nullable: true })
  roomNumber: string;

  /**todo
   * add hotel, tour,
   */
}
