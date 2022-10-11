import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './provider.entity';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ProvidersService {
  constructor(@InjectRepository(Provider) private repo: Repository<Provider>) {}

  create(providerDto: CreateProviderDto, user: User) {
    const provider = this.repo.create(providerDto);
    provider.user = user;
    return this.repo.save(provider);
  }
}
