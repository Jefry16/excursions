import { Column, Entity, Index } from 'typeorm';

@Entity()
export class WhiteList {
  @Column({ length: 64, nullable: false, primary: true })
  token_hash: string;

  @Column({ unsigned: true, nullable: false })
  @Index()
  expires_at: number;
}
