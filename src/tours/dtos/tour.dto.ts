import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/user.entity';

export class TourDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Transform(({ obj }) => obj)
  @Expose()
  provider: User;
}