import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/user.entity';

export class ProviderDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  person_in_charge: string;

  @Expose()
  email: string;

  @Expose()
  accept_payment: boolean

  @Transform(({ obj }) => obj.user.id || null)
  @Expose()
  userId: User;
}
