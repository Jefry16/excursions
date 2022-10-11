import { Body, Controller, Post } from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dtos/create.tour.dto';

@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {}
  @Post()
  create(@Body() tourDto: CreateTourDto) {
    // return this.toursService.create(tourDto);
  }
}
