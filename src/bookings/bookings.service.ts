import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsService } from '../clients/clients.service';
import { ClientDto } from '../clients/dtos/client.dto';
import { Repository } from 'typeorm';
import { Booking } from './bookings.entity';
import { CreateBookingNewClientDto } from './dtos/create-booking-new-client.dto';
import { User } from '../users/user.entity';
import { CreateTourDto } from '../tours/dtos/create.tour.dto';
import { CreateBookingDto } from './dtos/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private repo: Repository<Booking>,
    private clientService: ClientsService,
  ) {}

  async createBookingNewClient(
    bookingDto: CreateBookingNewClientDto,
    user: User,
  ) {
    const clientDto: ClientDto = {
      country: bookingDto.country,
      name: bookingDto.name,
      lastName: bookingDto.lastName,
      email: bookingDto.email,
      phone: bookingDto.phone,
    };
    const client = await this.clientService.create(clientDto, user);

    const bookingData: CreateBookingDto = {
      adults: bookingDto.adults,
      kids: bookingDto.kids,
      babies: bookingDto.babies,
      date: bookingDto.date,
      roomNumber: bookingDto.roomNumber,
    };

    const booking = this.repo.create(bookingData);
  }
}
