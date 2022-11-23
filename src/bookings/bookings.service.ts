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
import { ToursService } from '../tours/tours.service';
import { HotelsService } from '../hotels/hotels.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private repo: Repository<Booking>,
    private clientService: ClientsService,
    private tourService: ToursService,
    private hotelService: HotelsService,
  ) {}

  async createBookingNewClient(dto: CreateBookingNewClientDto, user: User) {
    const recieveClientId = Boolean(dto.clientId);
    if (recieveClientId) {
      return this.whenClientExists(dto.clientId, dto);
    }
    const booking = this.repo.create(dto);
    const { name, lastName, country, email, phone } = dto;
    const client = await this.clientService.create(
      {
        name,
        lastName,
        country,
        email,
        phone,
      },
      user,
    );
    booking.client = client;
    booking.tour = await this.tourService.findOneById(dto.tourId);
    booking.hotel = await this.hotelService.findOneById(dto.hotelId);
    return this.repo.save(booking);
  }

  async whenClientExists(id: number, dto: CreateBookingNewClientDto) {
    const booking = this.repo.create(dto);
    booking.client = await this.clientService.findOne(id);
    booking.tour = await this.tourService.findOneById(dto.tourId);
    booking.hotel = await this.hotelService.findOneById(dto.hotelId);
    return this.repo.save(booking);
  }
}
