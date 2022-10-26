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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  person_in_charge: string;


  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  created: Date;


  @ApiProperty()
  @Column({ nullable: false, default: false })
  accept_payment: boolean



  @ManyToOne(() => User, (user) => user.providers, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;

  @ApiProperty()
  @OneToMany(() => Tour, (tour) => tour.provider)
  tours: Tour[];
}
