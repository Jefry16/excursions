import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './provider.entity';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { User } from '../users/user.entity';
import { PageOptionsDto } from '../shared/pagination/page-option.dto';
import { PageMetaDto } from '../shared/pagination/page-meta.dto';
import { PageDto } from '../shared/pagination/page.dto';

@Injectable()
export class ProvidersService {
  constructor(@InjectRepository(Provider) private repo: Repository<Provider>) {}

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

  async findMany(pageOptionsDto: PageOptionsDto) {
    // return this.repo.find({relations: ['user']})
    const queryBuilder = this.repo.createQueryBuilder('provider');

    queryBuilder
      .orderBy('provider.created', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
      return new PageDto(entities, pageMetaDto);
  }
}
