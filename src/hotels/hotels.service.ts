import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './hotel.entity';

@Injectable()
export class HotelsService {
  constructor(@InjectRepository(Hotel) private hotelRepo: Repository<Hotel>) {}

  create(hotelName: string) {
    const slug = hotelName.trim().toLocaleLowerCase().split(' ').join('-');
    const name = hotelName.toLocaleLowerCase().trim();
    const hotel = this.hotelRepo.create({ name, slug });
    return this.hotelRepo.save(hotel);
  }

  findAll() {
    return this.hotelRepo.find();
  }
}
