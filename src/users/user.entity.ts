import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
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
