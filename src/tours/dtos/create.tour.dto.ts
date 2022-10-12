import { IsNumber, IsString } from 'class-validator';

export class CreateTourDto {
  @IsString()
  name: string;

  @IsNumber()
  providerId: number;

  // @IsNumber()
  // priceAdult: number;

  // @IsNumber()
  // priceKid: number;

  // @IsNumber()
  // providerId: number;
}
