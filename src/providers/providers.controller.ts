import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ProviderDto } from './dtos/provider.dto';
import { LoggedinGuard } from '../shared/guards/loggedin.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Provider } from './provider.entity';
import PaginationDto from '../shared/dtos/pagination.dto';


@Controller('providers')
// @UseGuards(LoggedinGuard)
// @Serialize(ProviderDto)
@ApiTags('providers')
@ApiResponse({ status: 201, type: Provider, description: 'created' })
export class ProvidersController {
  constructor(private providerService: ProvidersService) { }
  @Post('')
  createProvider(
    @Body() providerDto: CreateProviderDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.providerService.create(providerDto, currentUser);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.providerService.findOne(Number(id));
  }

  @Get()
  getMany(@Query() pageOptionsDto: PaginationDto) {
    return this.providerService.findMany(pageOptionsDto);
  }
}
