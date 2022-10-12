import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  // @Column()
  // priceAdult: number;

  // @Column()
  // priceKid: number;

  @ManyToOne(() => User, (user) => user.tours, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Provider, (provider) => provider.tours, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  provider: Provider;
}
