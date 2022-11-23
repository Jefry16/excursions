import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './bookings.entity';
import { ClientsModule } from '../clients/clients.module';
import { ToursModule } from '../tours/tours.module';
import { HotelsModule } from '../hotels/hotels.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    ClientsModule,
    ToursModule,
    HotelsModule,
  ],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
