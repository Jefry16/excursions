import { IsBoolean, IsEmail, IsNotEmpty, IsString, Length, } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  @Length(2, 200)
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @Length(2, 200)
  person_in_charge: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  accept_payment: boolean
}
