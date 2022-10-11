import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from '../providers/provider.entity';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  priceAdult: number;

  @Column()
  priceKid: number;

  // @ManyToOne(() => Provider, (provider) => provider)
  // provider: Provider;
}
