import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';

@Module({
  providers: [HotelsService],
  imports: [TypeOrmModule.forFeature([Hotel])],
  controllers: [HotelsController],
  exports: [HotelsService],
})
export class HotelsModule {}
