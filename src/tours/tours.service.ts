import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Tour } from './tour.entity';
import { CreateTourDto } from './dtos/create.tour.dto';
import { ProvidersService } from '../providers/providers.service';
import { User } from '../users/user.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour) private repo: Repository<Tour>,
    private providersSerice: ProvidersService,
  ) { }

  async create(tourDto: CreateTourDto, user: User) {
    const provider = await this.providersSerice.findOne(tourDto.providerId);
    const tour = this.repo.create(tourDto);
    tour.user = user;
    tour.provider = provider;
    return this.repo.save(tour);
  }

  async findOneById(id: number) {
    if (!id) {
      throw new NotFoundException('tour not found');
    }
    const tours = await this.repo.find({
      where: { id },
      relations: ['provider'],
    });
    if (!tours.length) {
      throw new NotFoundException('tour not found');
    }
    console.log(tours[0]);
    return tours[0];
  }

  findByName(name: string) {
    return this.repo.find({ where: { name: Like(`%${name}%`) }, })
  }
}
