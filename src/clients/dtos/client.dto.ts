import { Expose } from 'class-transformer';

export class ClientDto {
  @Expose()
  name: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  country: string;
}
