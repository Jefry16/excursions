import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dtos/create.tour.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { LoggedinGuard } from '../shared/guards/loggedin.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { TourDto } from './dtos/tour.dto';
import PaginationDto from '../shared/dtos/pagination.dto';
import { PaginatedTourDto } from './dtos/paginated-tour.dto';

@Controller('tours')
// @UseGuards(LoggedinGuard)
export class ToursController {
  constructor(private toursService: ToursService) { }

  @Post()
  @Serialize(TourDto)
  create(@Body() tourDto: CreateTourDto, @CurrentUser() user: User) {
    return this.toursService.create(tourDto, user);
  }

  @Get(':id')
  @Serialize(TourDto)
  getOneById(@Param('id') id: string) {
    return this.toursService.findOneById(Number(id));
  }

  @Get('')
  @Serialize(PaginatedTourDto)
  seachFor(@Query() paginationDto: PaginationDto) {
    return this.toursService.findMany(paginationDto)
  }

}
