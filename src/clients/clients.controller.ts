import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dtos/create-client.dto';
import { User } from '../users/user.entity';
import { ClientDto } from './dtos/client.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import PaginationDto from '../shared/dtos/pagination.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @Serialize(ClientDto)
  @Post()
  create(@Body() clientDto: CreateClientDto, @CurrentUser() user: User) {
    return this.clientService.create(clientDto, user);
  }
  
  @Serialize(ClientDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(Number(id));
  }

  @Get('')
  findMany(@Query() pageOptionsDto: PaginationDto) {
    return this.clientService.findMany(pageOptionsDto);
  }
}
