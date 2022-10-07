import { IsString } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  name: string;
}
