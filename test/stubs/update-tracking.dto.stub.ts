import { UpdateTrackingDto } from '../../src/modules/tracking/dto';
import { TRACKING_STATUS } from '../../src/modules';

export const UpdateTrackingDtoStub = (word: string): UpdateTrackingDto => ({
  word,
  sources: {
    chats: false,
    channels: false,
  },
  status: TRACKING_STATUS.BLOCKED,
});
