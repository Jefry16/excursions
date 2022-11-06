import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTourDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  providerId: number;

  @IsNumber()
  @IsPositive()
  priceAdult: number;

  @IsNumber()
  @IsPositive()
  priceKid: number;
}
