import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { WhiteList } from './whitelist-token.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User, WhiteList])],
  providers: [
    UsersService,
    { useClass: CurrentUserInterceptor, provide: APP_INTERCEPTOR },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
