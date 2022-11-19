import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  adults: number;

  @IsNumber()
  kids: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
