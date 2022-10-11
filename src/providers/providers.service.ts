import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './provider.entity';
import { CreateProviderDto } from './dtos/create-provider.dto';

@Injectable()
export class ProvidersService {
  constructor(@InjectRepository(Provider) private repo: Repository<Provider>) {}

  create(providerDto: CreateProviderDto) {
    const provider = this.repo.create(providerDto);
    return this.repo.save(provider);
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('provider not found');
    }
    const providers = await this.repo.findBy({ id });
    if (!providers.length) {
      throw new NotFoundException('provider not found');
    }

    return providers[0];
  }
}
