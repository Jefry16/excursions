import { Expose, Transform } from 'class-transformer';

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

}
