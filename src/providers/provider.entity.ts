import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  person_in_charge: string;

  @Column()
  email: string;

  @ManyToOne(() => User, (user) => user.providers)
  user: User;
}
