import { Body, Controller, Post, Query } from '@nestjs/common';
import { CreateBookingNewClientDto } from './dtos/create-booking-new-client.dto';
import { CreateBookingDto } from './dtos/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return createBookingDto;
  }

  @Post('newclient')
  createWithNewClient(@Body() dto: CreateBookingNewClientDto) {}
}
