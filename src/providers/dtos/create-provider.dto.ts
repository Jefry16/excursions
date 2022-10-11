import { IsEmail, IsString } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  person_in_charge: string;

  @IsEmail()
  email: string;
}
