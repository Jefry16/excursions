import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dtos/create.tour.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { LoggedinGuard } from '../shared/guards/loggedin.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { TourDto } from './dtos/tour.dto';
import { ApiTags } from '@nestjs/swagger';
import PaginationDto from '../shared/dtos/pagination.dto';

@Controller('tours')
@UseGuards(LoggedinGuard)
// @Serialize(TourDto)
@ApiTags('tours')
export class ToursController {
  constructor(private toursService: ToursService) { }
  @Post()
  create(@Body() tourDto: CreateTourDto, @CurrentUser() user: User) {
    return this.toursService.create(tourDto, user);
  }

  @Get(':id')
  getOneById(@Param('id') id: string) {
    return this.toursService.findOneById(Number(id));
  }

  @Get('')
  seachFor(@Query() paginationDto: PaginationDto) {
    return this.toursService.findMany(paginationDto)
  }

}
