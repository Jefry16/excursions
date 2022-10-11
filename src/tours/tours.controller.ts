import { Body, Controller, Post } from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dtos/create.tour.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {}
  @Post()
  create(@Body() tourDto: CreateTourDto, @CurrentUser() user: User) {
    return this.toursService.create(tourDto, user);
  }
}
