import { IsNumber, IsString } from 'class-validator';

export class CreateTourDto {
  @IsString()
  name: string;

  // @IsNumber()
  // priceAdult: number;

  // @IsNumber()
  // priceKid: number;

  // @IsNumber()
  // providerId: number;
}
