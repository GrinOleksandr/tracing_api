import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TRACKING_STATUS } from './types';

class SearchSources {
  @Prop()
  chats: boolean;

  @Prop()
  channels: boolean;
}

@Schema({ timestamps: true, versionKey: false })
export class Tracking {
  @Prop({ unique: true })
  word: string;

  @Prop({ type: String, enum: TRACKING_STATUS, default: TRACKING_STATUS.ACTIVE })
  status: TRACKING_STATUS;

  @Prop({ type: () => SearchSources, _id: false, default: { chats: true, channels: true } })
  sources: SearchSources;

  @Prop({ type: () => Date })
  createdAt?: Date;

  @Prop({ type: () => Date })
  updatedAt?: Date;
}

export const TrackingSchema = SchemaFactory.createForClass(Tracking);
