import { IsBoolean, IsEmail, IsNotEmpty, IsString, Length, } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger'

export class CreateProviderDto {
  @ApiProperty()
  @IsString()
  @Length(2, 200)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @Length(2, 200)
  person_in_charge: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsBoolean()
  accept_payment: boolean
}
