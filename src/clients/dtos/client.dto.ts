import { Expose } from 'class-transformer';

export class ClientDto {
  @Expose()
  name: string;
}
