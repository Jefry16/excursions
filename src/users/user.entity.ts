import { Provider } from '../providers/provider.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { report } from 'process';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Provider, (report) => report.user, { nullable: false })
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
