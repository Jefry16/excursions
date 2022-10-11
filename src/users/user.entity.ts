import { Provider } from '../providers/provider.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Provider, (providers) => providers.user)
  providers: Provider[];

  @AfterInsert()
  afterInsert() {
    console.log('inserted');
  }

  @AfterUpdate()
  afterUpdate() {
    console.log('updated');
  }

  @AfterRemove()
  afterRemove() {
    console.log('removed');
  }
}
