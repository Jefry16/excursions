import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ProviderDto } from './dtos/provider.dto';
import { LoggedinGuard } from '../shared/guards/loggedin.guard';
import { Provider } from './provider.entity';
import PaginationDto from '../shared/dtos/pagination.dto';
import { PaginatedProviderDto } from './dtos/paginated-provider.dto';

@Controller('providers')
 @UseGuards(LoggedinGuard)
export class ProvidersController {
  constructor(private providerService: ProvidersService) {}

  @Post('')
  @Serialize(ProviderDto)
  createProvider(
    @Body() providerDto: CreateProviderDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.providerService.create(providerDto, currentUser);
  }

  @Get(':id')
  @Serialize(ProviderDto)
  getOne(@Param('id') id: string) {
    return this.providerService.findOne(Number(id));
  }

  @Get('')
  @Serialize(PaginatedProviderDto)
  getMany(@Query() pageOptionsDto: PaginationDto) {
    return this.providerService.findMany(pageOptionsDto);
  }
}
