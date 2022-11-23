import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { HotelsService } from './hotels.service';
import { LoggedinGuard } from '../shared/guards/loggedin.guard';

@Controller('hotels')
@UseGuards(LoggedinGuard)
export class HotelsController {
  constructor(private hotelsService: HotelsService) {}

  @Get('')
  listAll() {
    return this.hotelsService.findAll();
  }
  @Post('')
  create(@Body() body: CreateHotelDto) {
    
    return this.hotelsService.create(body.name);
  }
}
