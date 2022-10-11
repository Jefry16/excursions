import { Body, Controller, Post } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('providers')
export class ProvidersController {
  constructor(private providerService: ProvidersService) {}
  @Post()
  createProvider(
    @Body() providerDto: CreateProviderDto,
    @CurrentUser() currentUser: User,
  ) {
    console.log(currentUser);
    return currentUser;
    return this.providerService.create(providerDto);
  }
}
