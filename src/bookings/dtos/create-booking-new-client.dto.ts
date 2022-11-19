import {
  IsNumber,
  IsNotEmpty,
  IsDateString,
  IsEmail,
  IsString,
} from 'class-validator';

export class CreateBookingNewClientDto {
  /**new client dto part */
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  /**
   * new booking dto part
   */

  
}
