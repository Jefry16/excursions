import { IsEmail, IsString, Length, Validate } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  @Length(2, 150)
  name: string;

  @IsString()
  phone: string;

  @IsString()
  @Length(2, 150)
  person_in_charge: string;

  @IsEmail()
  email: string;
}
