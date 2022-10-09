import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  createUser(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async findOneById(id: number) {
    if (!id) {
      throw new NotFoundException('user not found');
    }
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  findByEmail(param: string) {
    return this.repo.findBy({ email: param });
  }

  async remove(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return this.repo.remove(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    Object.assign(user, dto);
    const data = await this.repo.save(user);
    delete data.password;
    return data;
  }
}
