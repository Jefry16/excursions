import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Provider } from './provider.entity';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { User } from '../users/user.entity';
import PaginationDto from '../shared/dtos/pagination.dto';

@Injectable()
export class ProvidersService {
  constructor(@InjectRepository(Provider) private repo: Repository<Provider>) { }

  create(providerDto: CreateProviderDto, user: User) {
    const provider = this.repo.create(providerDto);
    provider.user = user;
    return this.repo.save(provider);
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('provider not found');
    }
    const providers = await this.repo.find({
      where: { id },
      relations: ['user'],
    });
    if (!providers.length) {
      throw new NotFoundException('provider not found');
    }

    return providers[0];
  }

  async findMany(paginationDto: PaginationDto) {

    const query = this.repo.createQueryBuilder('providers');
    query.leftJoinAndSelect('providers.user', 'user')
      .orderBy('providers.id', paginationDto.order).where({ name: Like(`%${paginationDto.q}%`) })
      .limit(paginationDto.limit)
      .offset(paginationDto.limit * (paginationDto.page - 1))
    const itemsCount = await query.getCount();
    const { entities } = await query.getRawAndEntities();

    return {
      data: entities,
      meta: {
        itemsCount,
        currentPage: paginationDto.page,
        pages: Math.ceil(itemsCount / paginationDto.limit),
      },
    };
  }
}
