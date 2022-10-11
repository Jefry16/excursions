import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ProviderDto } from './dtos/provider.dto';
import { LoggedinGuard } from '../shared/guards/loggedin.guard';

@Controller('providers')
@UseGuards(LoggedinGuard)
@Serialize(ProviderDto)
export class ProvidersController {
  constructor(private providerService: ProvidersService) {}
  @Post()
  createProvider(
    @Body() providerDto: CreateProviderDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.providerService.create(providerDto, currentUser);
  }
}
