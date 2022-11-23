import { Body, Controller, Post, Query } from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { BookingsService } from './bookings.service';
import { CreateBookingNewClientDto } from './dtos/create-booking-new-client.dto';
import { CreateBookingDto } from './dtos/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingService: BookingsService) {}
  @Post()
  create(@Body() dto: CreateBookingNewClientDto, @CurrentUser() user: User) {
    return this.bookingService.createBookingNewClient(dto, user);
  }
}
