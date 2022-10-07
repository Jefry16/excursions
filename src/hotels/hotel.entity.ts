import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
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

  @AfterInsert()
  afterInsert() {}

  @AfterUpdate()
  afterUpdate() {}

  @AfterRemove()
  afterRemove() {}
}
