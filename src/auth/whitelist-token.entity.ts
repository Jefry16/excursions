import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WhiteList {

  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ length: 64, nullable: false, })
  token_hash: string;

  @Column({ unsigned: true, nullable: false })
  @Index()
  expires_at: number;
}
