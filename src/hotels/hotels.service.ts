import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './hotel.entity';

@Injectable()
export class HotelsService {
  constructor(@InjectRepository(Hotel) private repo: Repository<Hotel>) {}

  create(hotelName: string) {
    const slug = hotelName.trim().toLocaleLowerCase().split(' ').join('-');
    const name = hotelName.toLocaleLowerCase().trim();
    const hotel = this.repo.create({ name, slug });
    return this.repo.save(hotel);
  }

  findAll() {
    return this.repo.find();
  }

  async findOneById(id: number) {
    if (!id) {
      throw new NotFoundException('hotel not found');
    }
    const hotel = await this.repo.findOneBy({ id });
    if (!hotel) {
      throw new NotFoundException('hotel not found');
    }
    return hotel;
  }
}
