import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITracking } from './types';
import { CreateTrackingDto, GetTrackingsQueryDto, UpdateTrackingDto } from './dto';
import { paginate } from '../../common/utils';
import { IPagination } from '../../common/types';
import { TrackingNotFoundException, WordAlreadyExistsException } from '../../common/exceptions';

@Injectable()
export class TrackingService {
  constructor(@InjectModel('Tracking') private TrackingModel: Model<ITracking>) {}

  async getTrackings(query: GetTrackingsQueryDto): Promise<IPagination<typeof Model<ITracking>>> {
    const { limit, skip, order, status, col } = query;

    return paginate(this.TrackingModel, {
      skip,
      limit,
      order,
      sortBy: col,
      filters: status ? { status } : {},
    });
  }

  async createTracking(createTrackingDto: CreateTrackingDto): Promise<ITracking> {
    await this.duplicatedTrackingWordGuard(createTrackingDto.word);

    const newTracking = await new this.TrackingModel(createTrackingDto);
    return newTracking.save();
  }

  async updateTracking(
    trackingId: string,
    updateTrackingDto: UpdateTrackingDto,
  ): Promise<ITracking> {
    const existingTracking = await this.TrackingModel.findById(trackingId);

    if (!existingTracking) {
      throw new TrackingNotFoundException(trackingId);
    }

    const { word } = updateTrackingDto;

    if (word && existingTracking.word !== word) {
      await this.duplicatedTrackingWordGuard(word);
    }

    return this.TrackingModel.findByIdAndUpdate(trackingId, updateTrackingDto, { new: true });
  }

  async deleteTracking(trackingId: string): Promise<ITracking> {
    const deletedTracking = await this.TrackingModel.findByIdAndDelete(trackingId);

    if (!deletedTracking) {
      throw new TrackingNotFoundException(trackingId);
    }

    return deletedTracking;
  }

  async duplicatedTrackingWordGuard(word: string): Promise<void> {
    const existingTrackingWithSameWord = await this.TrackingModel.findOne({ word });
    if (existingTrackingWithSameWord) {
      throw new WordAlreadyExistsException(existingTrackingWithSameWord._id);
    }
  }
}
