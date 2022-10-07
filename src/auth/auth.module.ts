import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { WhiteListService } from './white-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhiteList } from './whitelist-token.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([WhiteList]), UsersModule, SharedModule],
  providers: [AuthService, WhiteListService, WhiteList],
  exports: [AuthService, WhiteList, WhiteListService],
})
export class AuthModule {}
