import {
  IsNumber,
  IsNotEmpty,
  IsDateString,
  IsEmail,
  IsString,
  IsPositive,
  ValidateIf,
  Min,
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

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  adults: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  kids: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  babies: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsString()
  roomNumber: string;
  
  @IsNotEmpty()
  @IsNumber()
  tourId: number;
}
