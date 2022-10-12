import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Client } from './client.entity';
import { CreateClientDto } from './dtos/create-client.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(Client) private repo: Repository<Client>) {}
  create(clientDto: CreateClientDto, user: User) {
    const client = this.repo.create(clientDto);
    client.user = user;
    return this.repo.save(client);
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('client not found');
    }
    const clients = await this.repo.find({
      where: { id },
      relations: ['user'],
    });

    if (!id || !clients.length) {
      throw new NotFoundException('client not found');
    }
    return clients[0];
  }
}
