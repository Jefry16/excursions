import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Tour } from '../tours/tour.entity';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @Column()
  // phone: string;

  // @Column()
  // person_in_charge: string;

  // @Column()
  // email: string;

  @ManyToOne(() => User, (user) => user.providers, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;

  @OneToMany(() => Tour, (tour) => tour.provider)
  tours: Tour[];
}
