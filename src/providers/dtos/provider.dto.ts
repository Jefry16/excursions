import { Expose, Transform } from 'class-transformer';

export class ProviderDto {
  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  person_in_charge: string;

  @Expose()
  email: string;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;
}
