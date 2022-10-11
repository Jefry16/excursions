import { Body, Controller, Post } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dtos/create-provider.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private providerService: ProvidersService) {}
  @Post()
  createProvider(@Body() providerDto: CreateProviderDto) {
    return this.providerService.create(providerDto);
  }
}
