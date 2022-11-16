import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { HotelsModule } from './hotels/hotels.module';
import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { ReportsModule } from './reports/reports.module';
import { SharedModule } from './shared/shared.module';
import { ToursModule } from './tours/tours.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
const dbConfig = require('../ormconfig.js');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    ReportsModule,
    SharedModule,
    AuthModule,
    HotelsModule,
    ProvidersModule,
    ToursModule,
    ClientsModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
