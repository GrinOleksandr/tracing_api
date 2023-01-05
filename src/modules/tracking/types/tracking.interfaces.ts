import { Document } from 'mongoose';
import { TRACKING_STATUS } from './tracking.enums';

export interface ISearchSources {
  channels: boolean;

  chats: boolean;
}

export interface ITracking extends Document {
  word: string;
  status: TRACKING_STATUS;
  sources: ISearchSources;
  createdAt: Date;
  updatedAt: Date;
}
