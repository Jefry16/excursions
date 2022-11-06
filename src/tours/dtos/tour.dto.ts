import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/user.entity';

export class TourDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Transform(({obj})=>obj.provider.id)
  provider: number;
}
