import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { SharedModule } from './shared/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WhiteList } from './auth/whitelist-token.entity';
import { HotelsModule } from './hotels/hotels.module';
import { Hotel } from './hotels/hotel.entity';

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
        entities: [User, Report, WhiteList, Hotel],
        database: config.get<string>('DB_NAME'),
        username: 'root',
        password: '0.10.1mc',
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   database: 'di',
    //   entities: [User, Report, WhiteList, Hotel],
    //   synchronize: true,
    //   username: 'root',
    //   password: '0.10.1mc',
    // }),
    UsersModule,
    ReportsModule,
    SharedModule,
    AuthModule,
    HotelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
