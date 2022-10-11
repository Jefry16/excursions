import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './tour.entity';
import { CreateTourDto } from './dtos/create.tour.dto';
import { ProvidersService } from '../providers/providers.service';
import { User } from '../users/user.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour) private repo: Repository<Tour>, // private providersSerice: ProvidersService,
  ) {}

  create(tourDto: CreateTourDto, user: User) {
    const tour = this.repo.create(tourDto);
    tour.user = user;
    return this.repo.save(tour);
  }
}
