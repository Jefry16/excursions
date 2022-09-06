import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { WhiteList } from './whitelist-token.entity';
import { WhiteListService } from './white-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, WhiteList])],
  providers: [UsersService, AuthService, WhiteListService],
  controllers: [UsersController],
})
export class UsersModule {}
