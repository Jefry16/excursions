import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './tour.entity';

@Module({
  providers: [ToursService],
  controllers: [ToursController],
  imports: [TypeOrmModule.forFeature([Tour])],
})
export class ToursModule {}
