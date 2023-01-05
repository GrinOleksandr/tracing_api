import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { TrackingSchema } from './tracking.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tracking', schema: TrackingSchema }])],
  controllers: [TrackingController],
  providers: [TrackingService],
  exports: [TrackingService],
})
export class TrackingModule {}
