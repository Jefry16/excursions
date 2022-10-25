import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dtos/create-client.dto';
import { User } from '../users/user.entity';
import { ClientDto } from './dtos/client.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApiTags } from '@nestjs/swagger';


@Controller('clients')
@Serialize(ClientDto)
@ApiTags('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @Post()
  create(@Body() clientDto: CreateClientDto, @CurrentUser() user: User) {
    return this.clientService.create(clientDto, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(Number(id));
  }
}
