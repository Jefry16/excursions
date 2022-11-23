import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  adults: number;

  @IsNumber()
  kids: number;

  @IsNumber()
  babies: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsString()
  roomNumber: string;

  @IsNumber()
  @Min(0)
  discount: number;
}
