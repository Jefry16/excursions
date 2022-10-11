import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './tour.entity';
import { CreateTourDto } from './dtos/create.tour.dto';
import { ProvidersService } from '../providers/providers.service';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour) private repo: Repository<Tour>,
  ) // private providersSerice: ProvidersService,
  {}

  // create(tourDto: CreateTourDto) {
  //   this.providersSerice.findOne()
  //   const tour = this.repo.create(tourDto);
  //   return this.repo.save(tour);
  // }
}
