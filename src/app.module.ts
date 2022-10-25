import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Client } from './clients/client.entity';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Hotel } from './hotels/hotel.entity';
import { HotelsModule } from './hotels/hotels.module';
import { Module } from '@nestjs/common';
import { Provider } from './providers/provider.entity';
import { ProvidersModule } from './providers/providers.module';
import { Report } from './reports/report.entity';
import { ReportsModule } from './reports/reports.module';
import { SharedModule } from './shared/shared.module';
import { Tour } from './tours/tour.entity';
import { ToursModule } from './tours/tours.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { WhiteList } from './auth/whitelist-token.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        synchronize: true,
        entities: [User, Report, WhiteList, Hotel, Provider, Tour, Client],
        database: config.get<string>('DB_NAME'),
        username: 'root',
        password: '0.10.1mc',
      }),
    }),
    UsersModule,
    ReportsModule,
    SharedModule,
    AuthModule,
    HotelsModule,
    ProvidersModule,
    ToursModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
